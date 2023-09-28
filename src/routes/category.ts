import { Router } from "express";
import { CategoryController } from '../controller/CategoryController';

const router = Router();

router.get("/", CategoryController.all);

export default router;