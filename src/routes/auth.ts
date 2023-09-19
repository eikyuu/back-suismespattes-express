import { Router } from "express";
import { AuthController } from '../controller/AuthController';

  const router = Router();

  //login
  router.post("/login", AuthController.login);
  router.post("/forget-password", AuthController.forgetPassword);
  router.post("/reset-password", AuthController.resetPassword);

  export default router;