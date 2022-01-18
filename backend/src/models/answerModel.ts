import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    studentId: String,
    quizId: String,
    score: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
);

AnswerSchema.index({ studentId: 1, quizId: 1 }, { unique: true });

export default mongoose.model("Answer", AnswerSchema);
