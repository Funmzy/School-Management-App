import Stakeholder from '../models/stakeholders';
import Parent from '../models/parents.model'
import { Request, Response } from 'express'


//GET all parents
export const getAllParents = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const parents = await Stakeholder.find({user:'parent'});
  res.status(200).json({ message: 'successful', parents })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


//GET A parent
export const getSingleParent = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const parent = await Stakeholder.findOne({ _id: req.params.id }).select('-password');
  if (!parent) {
   throw new Error(`No user with id : ${req.params.id}`);
  }

  console.log(parent)
  res.status(200).json({ message: 'successful', parent })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}




export const updateParent = async (req: Request, res: Response) => {
 try {
  const parents = await Stakeholder.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
  res.status(200).json({ message: 'successful', parents })
 } catch (err: any) {
  console.log(err)
  res.status(400).send(err.message)
 }
}



export const deleteParent = async (req: Request, res: Response) => {

 const parent = await Stakeholder.findOneAndDelete({ _id: req.params.id});

 if (!parent) {
  throw new Error(`No product with id : ${req.params.id}`)
 }

 await parent.remove();
 res.status(200).json({ message: 'successfully deleted parent' })
};

