import Class from '../models/class'
import Student from '../models/students.model'
import {Request, Response} from 'express'

export const getAllClasses = async(req:Request, res:Response) =>{
    try{
        const data = await Class.find()
    res.status(200).json({ message: 'successful', data})
    } catch (err) {
        console.log(err)
        res.status(400).send('Not Found')
    }    
}

export const createClass = async(req:Request, res:Response) => {
    try{
        const newData = {...req.body}
        const student = await Student.find()
        for(let el in student){
            if(student[el].class === 'JSS1'){
                await Class.create({classname: req.body.classname, student: [`${student}`]})
            }
        }
        res.status(200).json({ message: 'successful'})
        
    }
    catch (err){
        console.log(err)
        res.status(400).send('Not Found')
    }
}



