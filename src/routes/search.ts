import { Router } from "express";
import SearchController from '../controller/SearchController';

const router = Router();

router.get("/", SearchController.fetchAllDestinationsByMultipleQueries);

export default router;