import React from 'react';
import i18n from 'i18n-js';
import {
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  TIMEOUT_CODE,
  CHANGE_LOGIN_INFOS,
  CHANGE_PASSWORD,
  GET_SOLE_IP,
  FETCH_SOLE,
  FETCH_SIMULATION,
  SEND_DATA,
  LAUNCH_ML,
  MISSING_DATAWALK_ERROR,
  resultOf,
  errorOf,
} from '../constants';
import { Alert } from '../components';

const initialState = {
  alerts: [],
  getSocietiesError: false,
  getBankAccountsError: false,
};

let idAlert = -1;

const alert = (state = initialState, action) => {
  idAlert += 1;
  switch (action.type) {
    case resultOf(FORGOT_PASSWORD): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert key={idAlert} message={i18n.t('passworOnEmail')} level={1} />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(REGISTER): {
      const tmp = { ...state };

      if (action.error.code === 1) {
        tmp.alerts.push(
          <Alert
            key={idAlert}
            message="Adresse email déjà utilisée"
            level={3}
          />
        );
      } else {
        tmp.alerts.push(
          <Alert key={idAlert} message={i18n.t('badConnexion')} level={3} />
        );
      }

      return {
        ...tmp,
      };
    }
    case errorOf(FORGOT_PASSWORD): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert key={idAlert} message={i18n.t('badConnexion')} level={3} />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(LOGIN): {
      const tmp = { ...state };

      if (action.error.code === 2) {
        tmp.alerts.push(
          <Alert key={idAlert} message="Identifiants incorrect" level={3} />
        );
      } else {
        tmp.alerts.push(
          <Alert key={idAlert} message={i18n.t('badConnexion')} level={3} />
        );
      }

      return {
        ...tmp,
      };
    }
    case resultOf(CHANGE_LOGIN_INFOS): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Vos informations ont été mis à jour !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(CHANGE_LOGIN_INFOS): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert key={idAlert} message="Un problème est survenu." level={3} />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(CHANGE_PASSWORD): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Votre mot de passe a été mis à jour !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(CHANGE_PASSWORD): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert key={idAlert} message="Un problème est survenu." level={3} />
      );

      return {
        ...tmp,
      };
    }
    case GET_SOLE_IP: {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Récupération de l'adresse IP de votre semelle en cours."
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(GET_SOLE_IP): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Adresse IP de la semelle récupérée !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(GET_SOLE_IP): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Un problème est survenu lors de la récupération de l'adresse IP de votre semelle."
          level={3}
        />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(FETCH_SOLE): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Votre semelle est connectée !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(FETCH_SOLE): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Un problème est survenu lors de la connexion de la semelle."
          level={3}
        />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(FETCH_SIMULATION): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Connexion à la simulation réussie !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(FETCH_SIMULATION): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Un problème est survenu lors de la connexion à la simulation."
          level={3}
        />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(SEND_DATA): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Données envoyées au serveur avec succès !"
          level={1}
        />
      );

      return {
        ...tmp,
      };
    }
    case errorOf(SEND_DATA): {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Un problème est survenu lors de l'envoie des données au serveur."
          level={3}
        />
      );

      return {
        ...tmp,
      };
    }
    case resultOf(LAUNCH_ML): {
      const tmp = { ...state };
      switch (action.result) {
        case 0: {
          tmp.alerts.push(
            <Alert
              key={idAlert}
              message="Aucune anomalie détectée !"
              level={1}
            />
          );
          break;
        }
        case 1: {
          tmp.alerts.push(
            <Alert key={idAlert} message="Anomalie détéctée !" level={3} />
          );
          break;
        }
        case 2: {
          tmp.alerts.push(
            <Alert
              key={idAlert}
              message="Création du profile de marche"
              level={2}
            />
          );
          break;
        }
        case 3: {
          tmp.alerts.push(
            <Alert
              key={idAlert}
              message="Analyse non réalisée car aucune donnée de marche trouvée"
              level={2}
            />
          );
          break;
        }
        default:
          break;
      }
      return {
        ...tmp,
      };
    }
    case errorOf(LAUNCH_ML): {
      const tmp = { ...state };
      if (action.error.code === 3) {
        tmp.alerts.push(
          <Alert key={idAlert} message="Aucune donnée à analyser !" level={3} />
        );
      } else {
        tmp.alerts.push(
          <Alert
            key={idAlert}
            message="Un problème est survenu lors du lancement de l'analyse."
            level={3}
          />
        );
      }

      return {
        ...tmp,
      };
    }
    case MISSING_DATAWALK_ERROR: {
      const tmp = { ...state };
      tmp.alerts.push(
        <Alert
          key={idAlert}
          message="Vous devez d'abord connecter votre semelle."
          level={3}
        />
      );

      return {
        ...tmp,
      };
    }
    default:
      return state;
  }
};

export default alert;
