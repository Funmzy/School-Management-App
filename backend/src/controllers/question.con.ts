import {Request, Response} from 'express'
import Quiz from '../models/quizModel'
import Question from '../models/questionModel'

export const createQuestion = async(req:Request, res: Response) =>{
    try{
        const quiz = await Quiz.findById(req.params.id)
        const question = await Question.create({...req.body, quizId:quiz._id});
        console.log(question)
        res.status(200).json({ 
            message: 'successfully created',
             question
            })
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}
 
export const getAllQuestions = async(req:Request, res: Response) => {
    try{
        const question = await Question.find()
        res.status(200).json({ message: 'successful', question})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}

export const getAQuizQuestions = async(req:Request, res: Response) => {
    try{
        const question = await Question.find({quizId: req.params.quizId})
        console.log(question)
        res.status(200).json({ message: 'successful', noOfQuestions: question.length, question})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}

export const getQuestion = async(req:Request, res: Response) => {
    try{
        const question = await Question.findOne({id: req.params._id})
        res.status(200).json({ message: 'successful', question})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}

export const updateQuestion = async(req:Request, res: Response) => {
    try{
        const question = await Question.findOneAndUpdate({id: req.params._id}, req.body, {new:true})
            console.log(req.params._id)
            if (!question) {
                throw new Error(`No user with id : ${req.params._id}`);
               }
            res.status(201).json({message:"successfully updated", question})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}



export const deleteQuestion = async(req:Request, res: Response) => {
    try{
        const data = await Quiz.findByIdAndDelete(req.params.id)
            if (!data) {
                throw new Error(`No user with id : ${req.params.id}`);
               }
            res.status(201).json({message:"successfully deleted", data})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found') 
    }
}

