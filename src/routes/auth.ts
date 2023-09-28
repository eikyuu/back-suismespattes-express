import { Router } from "express";
import { AuthController } from '../controller/AuthController';
import { signInLimiter } from '../middlewares/limiter';

  const router = Router();

  //login
  router.post("/login", signInLimiter, AuthController.login);
  router.post("/forget-password", AuthController.forgetPassword);
  router.post("/reset-password", AuthController.resetPassword);

  export default router;