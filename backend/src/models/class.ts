import mongoose from 'mongoose'

const ClassSchema =  new mongoose.Schema({
    classname : {
        enums: ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3']
    },
    students: [
        {
        fullName: String,
        userId: String,
        classId: String
        }
    ]
})


export default mongoose.model('Class', ClassSchema);