import { Router } from "express";
import { WalkController } from '../controller/WalkController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

router.get("/", WalkController.all);

router.get("/:slug", WalkController.one);

router.post("/", [checkJwt, checkRole(["ROLE_USER"])], WalkController.save);

router.delete("/:slug",[checkJwt, checkRole(["ROLE_ADMIN"])], WalkController.remove);

router.post("/images", [checkJwt, checkRole(["ROLE_USERddd"])], WalkController.uploadImage);

router.get("/images/:filename",[checkJwt, checkRole(["ROLE_ADMIN"])], WalkController.getImages);

export default router;