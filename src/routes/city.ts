import { Router } from "express";
import CityController from '../controller/CityController';

const router = Router();

router.get("/", CityController.fetchAllCityBySearch);

router.get("/:codePostal", CityController.fetchCityByCodePostal);

export default router;