import createHttp from "./BaseServices";

const http = createHttp(true);

/*export const getCurrentUser = () => 
http.get("/profile").then((res) => res);*/

export const getUsers = () => 
  http.get("/users").then((res) => res);

export const getListYourJourneys = () => 
  http.get("/creators/journeys").then((res) => res);

export const getDetail = (id) => 
  http.get(`/users/${id}`).then((res) => res);

export const getCreator = (id) => 
  http.get(`/creators/${id}`).then((res) => res);


export const getCurrentUser = () =>{ 
  console.log(localStorage);
  return http.get("/profile").then((res) => res);
}