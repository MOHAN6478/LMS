import mongoose, { mongo } from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    userId: { type : String, required : true },
    courseId: { type : String, required : true },
    completed: { type : Boolean, default : false },
    lectureCompleted: [],
},{minimize : false});

export const CourseProgress = mongoose.models.courseprogress || mongoose.model('CourseProgress', courseProgressSchema)

export default CourseProgress;