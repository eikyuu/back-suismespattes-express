import { Router } from "express";
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { CategoryController } from '../controller/CategoryController';

const router = Router();

router.get("/", CategoryController.all);

export default router;