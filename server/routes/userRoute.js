import express from 'express'
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)

// user Progress Data
userRouter.post('/update-course-progress',updateUserCourseProgress)
userRouter.get('/get-course-progress', getUserCourseProgress)

// User Rating
userRouter.post('/add-rating', addUserRating)

export default userRouter;