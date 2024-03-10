import { Router } from "express";
import user from "./user";
import auth from "./auth";
import destination from "./destination";
import category from './category';
import city from './city';
import search from './search';

const routes = Router();

// SEARCH
routes.use("/search", search);

// AUTH
routes.use("/auth", auth);

// USER
routes.use("/users", user);

// DESTINATION
routes.use("/destinations", destination);

// CATEGORY
routes.use("/categories", category);

// CITY
routes.use("/cities", city)

export default routes;