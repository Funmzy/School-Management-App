import mongoose from 'mongoose'

const QuizSchema = new mongoose.Schema({
    subject: String,
    title: String,
    startTime: Date,
    endTime: Date
})





export default mongoose.model('Quiz', QuizSchema);


