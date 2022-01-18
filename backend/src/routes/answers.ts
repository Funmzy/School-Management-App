import express from "express";
import { createAnswer, submitAnswer } from "../controllers/answer.con";

const router = express.Router();

router.post("/:id/quizId", createAnswer);
router.post("/submit-answers/:quizId", submitAnswer);

export default router;
