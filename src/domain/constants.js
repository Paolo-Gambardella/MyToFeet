/* eslint-disable import/prefer-default-export */

export const MENU = [
  {
    section: 'Informations',
    items: [
      {
        name: 'Identifiants',
        route: 'EditIdentifiants',
        color: '#91C4F2',
        icon: 'people',
      },
      {
        name: 'Modifier l’adresse email',
        route: 'EditEmail',
        color: '#91C4F2',
        icon: 'email',
      },
      {
        name: 'Modifier le mot de passe',
        route: 'EditPassword',
        color: '#91C4F2',
        icon: 'vpn-key',
      },
    ],
  },
  {
    section: 'Application',
    items: [
      {
        name: 'À propos',
        route: 'About',
        color: '#fdd835',
        icon: 'info',
      },
      {
        name: 'Déconnexion',
        route: 'NotLogged',
        color: '#FF5A5F',
        icon: 'power-settings-new',
      },
    ],
  },
];

export const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
