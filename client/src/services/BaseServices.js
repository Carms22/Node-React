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

/*const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    credentials: 'include',
    baseURL: "http://localhost:3000/api",
  });
  
    http.interceptors.request.use((request) => {
      console.log(`http.interceptors.request.use((request)${useAccessToken}`);
      if (useAccessToken && getAccessToken()) {
        console.log(`if (useAccessToken && getAccessToken())${useAccessToken}`); 
        // set token on header
        request.headers.Authorization = `Bearer ${getAccessToken()}`;
        console.log(request.headers.Authorization);
      }
      return request;
    });

    http.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (
          error?.response?.status &&
          [401, 403].includes(error.response.status) // en este if puedo entrar si no envío token o bien si esta expirado y el back ha devuelto un 401/403
        ) {
          if (getAccessToken()) {
            // delete token
            logout(); 
            if (window.location.pathname !== "/login") {
              window.location.assign("/login");
            }
          }
        }
        return Promise.reject(error);
      }
      
    );
  
    return http;
}

export default createHttp;*/