export const ACCESS_TOKEN_KEY = "access_token";

let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || ""; // cojo el token del localStorage y envio siempre un string, o bien el valor de access_token o bien ""

export const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem(ACCESS_TOKEN_KEY, token); // seteamos un elemento en localStorage "key" -> value
};

export const getAccessToken = () => {
  return accessToken; // nos devuelve el token del localStorage con la clave access_token
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.location.assign("/login"); // lo "mismo" que el redirect, para redireccionar a /login
};