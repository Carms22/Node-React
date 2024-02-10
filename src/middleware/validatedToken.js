import jwt from "jsonwebtoken";
//import createHttpError from "http-errors";
//import { TOKEN_SECRET } from "../config.js";

import createError from "http-errors";
import { StatusCodes } from "http-status-codes";

export const isAuthenticated = (req, res, next) => {
  const authorization = req.header("Authorization"); // "Bearer <token>""

  if (!authorization) {
    return next(
      createError(
        StatusCodes.UNAUTHORIZED,
        "Authorization header was not provided"
      )
    );
  }

  const [schema, token] = authorization.split(" "); // "Bearer <token>" --> ["Bearer", "<token>"]

  if (schema !== "Bearer") {
    return next(
      createError(
        StatusCodes.UNAUTHORIZED,
        "Authorization schema is not supported"
      )
    );
  }

  if (!token) {
    return next(
      createError(StatusCodes.UNAUTHORIZED, "A token must be provided")
    );
  }

  // Me aseguro que tengo schema y tengo token

  const secret = process.env.JWT_SECRET || "test";

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(err);
    }

    req.currentUserId = decodedToken.id;
    next();
  });
};



