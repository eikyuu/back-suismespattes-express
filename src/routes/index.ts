import { Router, Request, Response } from "express";
import user from "./user";
import auth from "./auth";
import destination from "./destination";

const routes = Router();

routes.use("/auth", auth);
routes.use("/destination", destination);
routes.use("/user", user);

export default routes;