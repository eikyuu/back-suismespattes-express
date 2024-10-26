import { Router } from "express";
import UserController from '../controller/UserController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { signUpLimiter } from '../middlewares/limiter';

const router = Router();

//Create a new user
router.post("/", UserController.save);

router.post("/:id/picture", [], UserController.uploadPicture);
router.put("/:id", [], UserController.update);
router.get("/:id", [], UserController.one);
router.get("/:id/picture", [], UserController.getPicture);
router.get("/:id/destination", [], UserController.fetchDestinationsByUser);

export default router;