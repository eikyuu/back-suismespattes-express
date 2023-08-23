import { Router } from "express";
import { AuthController } from '../controller/AuthController';

  const router = Router();

  //login
  router.post("/login", AuthController.login);

  //logout
  router.post("/logout", AuthController.logout);

  export default router;