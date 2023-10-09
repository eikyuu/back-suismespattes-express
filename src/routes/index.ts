import { Router } from "express";
import user from "./user";
import auth from "./auth";
import destination from "./destination";
import category from './category';
import city from './city';
import search from './search';
import { signUpLimiter } from '../middlewares/limiter';

const routes = Router();

// SEARCH
routes.use("/search", search);

// AUTH
routes.use("/auth", auth);

// USER
routes.use("/user", signUpLimiter, user);

// DESTINATION
routes.use("/destination", destination);

// CATEGORY
routes.use("/category", category);

// CITY
routes.use("/city", city)

export default routes;