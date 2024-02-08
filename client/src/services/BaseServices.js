import axios from 'axios';
import { getAccessToken, logout } from "../store/AccessTokenStore";

const createHttp = (useAccessToken = false) => {
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

export default createHttp;