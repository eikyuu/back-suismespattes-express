import { Router, Request, Response } from "express";
import user from "./user";
import auth from "./auth";
import walk from "./walk";

const routes = Router();

routes.use("/auth", auth);
routes.use("/walks", walk);
routes.use("/user", user);



export default routes;