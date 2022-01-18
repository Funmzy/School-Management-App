import express from 'express'
import { createQuestion, getAllQuestions, getQuestion, getAQuizQuestions, updateQuestion, deleteQuestion } from '../controllers/question.con'


const router = express.Router()

router.post('/:id', createQuestion)
router.get('/', getAllQuestions)
// router.get('/:id', getQuestion)
router.get('/:quizId', getAQuizQuestions)
router.put('/:id', updateQuestion)
// router.put('/:id', updateQuestions)
router.delete('/:id', deleteQuestion)



export default router