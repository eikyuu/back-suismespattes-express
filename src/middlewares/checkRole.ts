import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { UserRepository } from '../repository/user.repository';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user email from previous midleware
    const email = res.locals.jwtPayload.email;

    //Get user role from the database
;
    let user: User;
    try {
      user = await  UserRepository.findOneOrFail({ where: { email: email } });
    } catch (err) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    user.roles.map((role) => {
      if (roles.includes(role)) {
        return next();
      } else {
        res.status(401).send({ message: "Unauthorized role" });
      }
    })
  };
};