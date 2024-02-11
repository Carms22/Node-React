import createHttp from "./BaseServices";

const http = createHttp(true);


export const getPosts = () => 
  http.get("/posts").then((res) => res);

export const getPost = (id) => 
  http.get(`/posts/${id}`).then((res) => res);

export const createPosts = (body) => 
  http.post("/posts", body).then((res) => res);

export const deletePosts = (id) => 
  http.delete(`/posts/${id}`).then((res) => res);

export const editPosts = (id) => 
  http.put(`/posts/${id}`).then((res) => res);

export const like = (id) => 
  http.put(`/like/${id}`).then((res) => res);


