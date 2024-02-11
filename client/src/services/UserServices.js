import createHttp from "./BaseServices";

const http = createHttp(true);

export const getDetail = (id) => 
  http.get(`/users/${id}`).then((res) => res);

export const getCurrentUser = () =>{ 
  console.log(localStorage);
  return http.get("/profile").then((res) => res);
}
export const myHome = () =>{ 
  return http.get("/home").then((res) => res);
}

export const follow = (id) => 
  http.put(`/follow/${id}`).then((res) => res);

export const followingList = (id) => 
  http.get(`/followingList/${id}`).then((res) => res);

export const followersList = (id) => 
  http.get(`/followersList/${id}`).then((res) => res);

export const search = (body) => 
  http.get(`/search`, body).then((res) => res);
