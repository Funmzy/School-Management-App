import Stakeholder from '../models/stakeholders';
import { Request, Response } from 'express'


//GET all teachers
export const getAllTeachers = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const teachers = await Stakeholder.find({user:'teacher'});
  res.status(200).json({ message: 'successful', teachers })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


//GET A Teacher
export const getSingleTeacher = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const teacher = await Stakeholder.findOne({ _id: req.params.id }).select('-password');
  if (!teacher) {
   throw new Error(`No user with id : ${req.params.id}`);
  }

  console.log(teacher)
  res.status(200).json({ message: 'successful', teacher})
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}





export const updateTeacher = async (req: Request, res: Response) => {
 const id = req.params.id
 console.log(id)
 try {
  const teacher = await Stakeholder.findOneAndUpdate({_id: id}, req.body, {new:true})
  res.status(200).json({ message: 'successful', teacher })
 } catch (err: any) {
  console.log(err)
  res.status(400).send(err.message)
 }
}

export const deleteTeacher = async (req: Request, res: Response) => {
 const teacher = await Stakeholder.findOneAndDelete({ _id: req.params.id});

 if (!teacher) {
  throw new Error(`No product with id : ${req.params.id}`)
 }

 await teacher.remove();
 res.status(200).json({ message: `successfully deleted teacher with id ${req.params.id}` })
};
