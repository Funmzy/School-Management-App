import express from 'express'
import {getAllStudents, getSingleStudent, updateStudent, deleteStudent} from '../controllers/student.controller'
import auth from '../middleware/auth'


const router = express.Router();

router.get('/', getAllStudents)
router.get('/:id', getSingleStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)


export default router