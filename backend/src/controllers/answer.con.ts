import Student from "../models/students.model";
import Answer from "../models/answerModel";
import Question from "../models/questionModel";
import { Request, Response } from "express";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ id: req.params.userId });
    const question = await Question.findById({ quizId: req.params.quizId });
    if (student && question) {
      const answer = await Answer.create({
        studentId: student.userId,
        quizId: question.quizId,
        score: 0,
      });
      return res.status(200).json({ message: "successful", answer });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.quizId;
    // const studentId = req.body.studentId;
    const answers = req.body.answers;

    /**
     * 2. get studentId from req.body
     * 3. [
     *    {
     *    questionId: "61d73297d4293367ce6cf24c",
     *    ans: "Fish"
     *   }
     *   ]
     *
     * 4 get all questions by the quizId
     *
     */

    const questions = await Question.find({ quizId }).select("+answer");

    let score = 0;
    // let total = 0;

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < answers.length; j++) {
        // console.log(questions[i]._id, answers[j].questionId);
        if (questions[i]._id.equals(answers[j].questionId)) {
          // total++
          if (questions[i].answer === answers[j].answer) {
            score++;
          }
        }
      }
    }

    console.log(score);

    const answer = await Answer.create({
      studentId: req.body.studentId,
      quizId: req.params.quizId,
      score: score,
      total: questions.length,
    });
    res.status(200).json({
      message: "successful",
      answer,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};
