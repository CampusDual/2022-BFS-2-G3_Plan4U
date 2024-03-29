import { environment } from '../../environments/environment';

export const API_CONFIG = {
  authUrl: environment.authBaseUrl,
  login: environment.authBaseUrl + '/oauth/token',
  logout: environment.authBaseUrl + '/logout',
  getAllProfiles: environment.adminBaseUrl + '/getAllProfiles',
  getAllSections: environment.adminBaseUrl + '/getAllSections',

  // Users API
  getUsers: environment.usersBaseUrl + '/getUsers',
  getUser: environment.usersBaseUrl + '/getUser',
  createUser: environment.usersBaseUrl + '/createUser',
  editUser: environment.usersBaseUrl + '/editUser',
  deleteUser: environment.usersBaseUrl + '/deleteUser',

  // Publications API
  getPublications: environment.publicationsBaseUrl + '/getPublications',
  getPublication: environment.publicationsBaseUrl + '/getPublication',
  createPublication: environment.publicationsBaseUrl + '/createPublication',
  editPublication: environment.publicationsBaseUrl + '/editPublication',
  deletePublication: environment.publicationsBaseUrl + '/deletePublication',
  getDataChart: environment.publicationsBaseUrl + '/getDataChart',
  getCategories: "http://localhost:9999/categories/getCategories",
  getProvinces: "http://localhost:9999/provinces/getProvinces",
};