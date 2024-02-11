import axios from 'axios';
import { getAccessToken, logout } from "../store/AccessTokenStore";

const INVALID_STATUS_CODES = [401];

const createHttp = (useAccessToken = false) => {
  console.log(`entro en createHttp`);
  // Si le pongo true, manda el token si le pone false no hay cabecera Authorization
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  
  if (useAccessToken) {
    console.log(`entro en createHttp useAccessToken--> ${useAccessToken}`);
    http.interceptors.request.use(
      (config) => {
        // Si alguien crea una instancia de createHttp pasando useAccesToken a true, quiere decir que esa peticion requiere esta autenticada. Por lo que intento coger el token de la store y meterselo en la cabecera Authorization
        config.headers.Authorization = `Bearer ${getAccessToken()}`;

        return config;
      },
      (err) => Promise.reject(err)
    );
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // if (error && err.response && err.response.status) // Codigo equivalente
      if (
        error?.response?.status &&
        INVALID_STATUS_CODES.includes(error.response.status)
      ) {
        // Si tengo un error 401, probablemente movida de JWT. Borro el token y te llevo al login
        if (getAccessToken()) {
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  return http;
};
export default createHttp;
