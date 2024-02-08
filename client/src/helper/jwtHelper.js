//import { decode } from "jsonwebtoken";
import * as jwt_decode from 'jwt-decode';

/*const verifyJWT = (token) => {
  console.log(`entro en verifyJWT ${token} `);
  const decodedToken = decode(token);
  return Date.now() <= decodedToken.exp * 1000; 
};*/


const verifyJWT = (token) => {
  console.log('helper verifyJWT');
  try {
    const decodedToken = jwt_decode(token);
    return Date.now() <= decodedToken.exp * 1000;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return false; // O manejar el error de la manera que prefieras
  }
};

export default verifyJWT;