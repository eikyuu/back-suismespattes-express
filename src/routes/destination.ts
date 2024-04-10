import { Router } from "express";
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { DestinationController } from '../controller/DestinationController';

const router = Router();

router.get("/", DestinationController.all);

router.get("/search", DestinationController.fetchAllNamesAndSlugs);

router.post("/geocode", DestinationController.geocode);

router.get("/:slug", DestinationController.one);

router.post("/", [checkJwt, checkRole(["ROLE_USER"])], DestinationController.save);

router.put("/:slug", [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])], DestinationController.update);

router.delete("/:slug",[checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])], DestinationController.remove);

router.post("/images", [checkJwt, checkRole(["ROLE_USER"])], DestinationController.uploadImage);

router.get("/images/:filename", DestinationController.getImages);

router.put("/images/:slug", [checkJwt, checkRole(["ROLE_ADMIN"])], DestinationController.removeDestinationImage);


export default router;