import { Request, Response } from "express";
import Quiz from "../models/quizModel";

export const getAllQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.find();
    res.status(200).json({ message: "successful", quiz });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    res.status(200).json({ message: "successful", quiz });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {

    const data = await Quiz.create({ ...req.body });
    res.status(200).json({ message: "successfully created", data });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};



export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const data = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      throw new Error(`No user with id : ${req.params.id}`);
    }
    res.status(201).json({ message: "successfully updated", data });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const data = await Quiz.findByIdAndDelete(req.params.id);
    if (!data) {
      throw new Error(`No user with id : ${req.params.id}`);
    }
    res.status(201).json({ message: "successfully deleted", data });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};
