import createHttp from "./BaseServices";

const http = createHttp(true);

export const createComment = () => 
  http.post("/comments").then((res) => res);

export const deleteComment = (id) => 
  http.delete(`/posts/${id}`).then((res) => res);

