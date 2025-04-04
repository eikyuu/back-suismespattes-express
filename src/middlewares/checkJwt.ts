import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"]?.split(" ")[1];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ message: "Non autorisé" });
    return;
  }

  //The token is valid for 1 day
  //We want to send a new token on every request
  const { pseudo, email } = jwtPayload;
  const newToken = jwt.sign({ pseudo, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};