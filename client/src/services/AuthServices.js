import createHttp from "./BaseServices";

const http = createHttp();


export const userLogin = (data) =>{ 
  return http.post("/login",data).then((res)=>res)
}
export const createUser = (body) =>{
  return http.post("/register", body).then((res) => res);
};

