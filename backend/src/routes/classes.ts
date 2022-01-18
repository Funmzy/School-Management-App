import express from 'express'
import {getAllClasses, createClass} from '../controllers/class.controller'


const router = express.Router();

router.get('/', getAllClasses)
router.post('/', createClass)


export default router