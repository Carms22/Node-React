import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { TOKEN_SECRET } from "../config.js";

export const isAuthenticated = (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    console.log('validando');
    const token = req.cookies;
    const access_token = req.access_token
    if (token || access_token) {
      console.log(`token en el if the isAuthenn back ${token}`);
        jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
          if (err) {
            if (err.name === 'JsonWebTokenError') {
                next(createHttpError(401, 'Invalid token'));
            } else {
                next(err);
            }
        } else {
            req.currentUser = decodedToken;
            next();
        }
          })
          /*if (err) { 
            next(err);
          } else {
            req.currentUser = decodedToken;
            next();
          }
        })*/
    } else {
        next(createHttpError(401, 'Token error'));
    }
}

