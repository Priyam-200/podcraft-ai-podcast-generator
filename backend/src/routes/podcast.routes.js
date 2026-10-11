
import { Router } from "express";
import {
  createScript,
  createAudio,
} from "../controllers/podcast.controller.js";

const router = Router();

router.post("/script", createScript);
router.post("/audio", createAudio);

export default router;
