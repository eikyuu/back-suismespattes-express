import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { UserRepository } from '../repository/user.repository';

export const checkRole = (authorizedRoles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user email from previous midleware
    const email = res.locals.jwtPayload.email;

    //Get user role from the database
    ;
    let user: User;
    try {
      user = await UserRepository.findOneOrFail({ where: { email: email } });
    } catch (err) {
      res.status(401).send();
    }

    const authorized = user.roles.some(role => authorizedRoles.includes(role));

    if (authorized) {
      next();
    } else {
      res.status(401).send({ message: "Not authorized" });
    }

  };
};