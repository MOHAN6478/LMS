import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate();

    const currency = import.meta.env.VITE_CURRENCY

    const [ allCourses, setAllCourses ] = useState([]);

    const [ isEducator, setIsEducator ] = useState(true)

    const [ enrolledCourses, setEnrolledCourses ] = useState([])

    // Fetch All Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // Function to calculate average rating of course

    const calculateRating = (course) => {
        if(course.courseRatings.length === 0){
            return 0
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    // Function to calculate Course chapter Time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units : ["h","m"]})
    }

    // Function to calculate Course Duration 
    const calculateCourseDuration = (course) => {
        let time = 0;

        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration 
        ))
        return humanizeDuration(time * 60 * 1000, {units : ["h","m"]})
    }

    // Function calculate to No of Lectures in the course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        })
        return totalLectures;
    }

    // Fetch user Enrolled Courses
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])

    
    const value = {
        navigate, currency, allCourses, setAllCourses,
        calculateRating,
        isEducator, setIsEducator,
        calculateChapterTime, calculateCourseDuration, calculateNoOfLectures,
        enrolledCourses, fetchUserEnrolledCourses 
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}