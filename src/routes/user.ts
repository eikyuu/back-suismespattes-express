import { Router } from "express";
import UserController from '../controller/UserController';

const router = Router();

//Create a new user
router.post("/", UserController.save);

export default router;