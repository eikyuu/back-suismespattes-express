import { Router } from "express";
import user from "./user";
import auth from "./auth";
import destination from "./destination";
import category from './category';
import { signUpLimiter } from '../middlewares/limiter';

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", signUpLimiter, user);

routes.use("/destination", destination);
routes.use("/category", category);



export default routes;