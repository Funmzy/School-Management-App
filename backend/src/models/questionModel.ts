import mongoose from "mongoose";


const QuestionSchema = new mongoose.Schema({
    // questionId: mongoose.Types.ObjectId,
    // questions:[
    //     {
    //         question:String,
    //         choice1: String,
    //         choice2: String,
    //         choice3: String,
    //         choice4: String,
    //         answer: String
            
    //     }
    // ],
    questionId: mongoose.Types.ObjectId,
    quizId: String,
    question: String,
    choices: Array,
    answer: {
       type: String,
       select: false
    }
});

/**
 * create question for a quiz
 * get all questions of a particular quiz
 * update question by id
 * del question by id
 * 
 * 
 */


export default mongoose.model('Question', QuestionSchema);