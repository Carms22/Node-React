import createHttp from "./BaseServices";

const http = createHttp();


export const userLogin = (data) =>{ 
  for(let prop in data){
    console.log(`http ${data[prop]}`);
  }
  
  return http.post("/login",data).then((res)=>res)
}
export const createUser = (body) =>{
  return http.post("/register", body).then((res) => res);
};

export const getCurrentUser = () =>{ 
  console.log(localStorage);
  return http.get("/profile",{ withCredentials: true }).then((res) => res);
}