import express from 'express'
import { createQuiz, getAllQuiz, getQuiz, updateQuiz, deleteQuiz } from '../controllers/quiz.controller'


const router = express.Router()

router.post('/', createQuiz)
router.get('/', getAllQuiz)
router.get('/:id', getQuiz)
router.put('/:id', updateQuiz)
router.delete('/:id', deleteQuiz)




export default router