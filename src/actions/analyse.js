/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import client from '../utils/Axios';
import {
  GET_SOLE_IP,
  FETCH_SOLE,
  FETCH_SIMULATION,
  SEND_DATA,
  LAUNCH_ML,
  MISSING_DATAWALK_ERROR,
  GET_ANALYSIS_HISTORY,
  resultOf,
  errorOf,
} from '../constants';
import { API_URL } from '../env';

export const getSoleIp = () => dispatch => {
  dispatch({ type: GET_SOLE_IP });

  return client
    .get('/soleip')
    .then(response => {
      if (response.data.ip)
        dispatch({ type: resultOf(GET_SOLE_IP), data: response.data.ip });
      else dispatch({ type: errorOf(GET_SOLE_IP) });
    })
    .catch(error => {
      dispatch({ type: errorOf(GET_SOLE_IP), error });
    });
};

export const fetchSole = ip => dispatch => {
  dispatch({ type: FETCH_SOLE });

  const soleClient = axios.create({
    baseURL: `http://${ip}`,
    withCredentials: true,
    responseType: 'json',
  });

  return soleClient
    .get(`/allsensorvalues`)
    .then(response => {
      dispatch({ type: resultOf(FETCH_SOLE), data: response.data });
      dispatch(sendData());
    })
    .catch(error => {
      dispatch({ type: errorOf(FETCH_SOLE), error });
    });
};

export const fetchSimulation = timestamp => dispatch => {
  dispatch({ type: FETCH_SIMULATION });

  return client
    .get(`/simulation?timestamp=${timestamp}`)
    .then(response => {
      dispatch({
        type: resultOf(FETCH_SIMULATION),
        data: response.data.message.data,
      });
      dispatch(sendData());
    })
    .catch(error => {
      dispatch({ type: errorOf(FETCH_SIMULATION), error });
    });
};

export const sendData = () => (dispatch, getState) => {
  const state = getState();

  dispatch({ type: SEND_DATA });

  // eslint-disable-next-line no-undef
  fetch(`${API_URL}/walk`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.analyse.dataWalk),
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: resultOf(SEND_DATA), data: responseJson.data });
    })
    .catch(error => {
      dispatch({ type: errorOf(SEND_DATA), error });
    });
};

export const launchML = () => dispatch => {
  dispatch({ type: LAUNCH_ML });

  // eslint-disable-next-line no-undef
  return client
    .post(`/analysis`)
    .then(response => {
      dispatch({ type: resultOf(LAUNCH_ML), result: response.data.code });
      dispatch(getAnalysisHistory());
    })
    .catch(error => {
      dispatch({ type: errorOf(LAUNCH_ML), error: error.response.data });
    });
};

export const missingDataWalkError = () => dispatch => {
  dispatch({ type: MISSING_DATAWALK_ERROR });
};

export const getAnalysisHistory = () => dispatch => {
  dispatch({ type: GET_ANALYSIS_HISTORY });

  return client
    .get('/analysis')
    .then(response => {
      dispatch({ type: resultOf(GET_ANALYSIS_HISTORY), data: response.data });
    })
    .catch(error => {
      dispatch({ type: errorOf(GET_ANALYSIS_HISTORY), error });
    });
};
