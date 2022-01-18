import express from 'express'
import { getAllParents, getSingleParent, updateParent, deleteParent} from '../controllers/parent.controller';

const router = express.Router();

router.get('/', getAllParents)
router.get('/:id', getSingleParent)
router.put('/:id', updateParent)
router.delete('/:id', deleteParent)


export default router