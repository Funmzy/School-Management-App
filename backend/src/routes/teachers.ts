import express from 'express'
import { getAllTeachers, getSingleTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller'

const router = express.Router()

router.get('/', getAllTeachers)
router.get('/:id', getSingleTeacher)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

export default router