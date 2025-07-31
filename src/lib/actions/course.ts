import axios from "axios";
import { Course, CreateCourseBody } from "../types";
import { apiUrl } from "../envService";



const create = async (course: CreateCourseBody) => {
    try {
        const response = await axios.post(`${apiUrl}/courses/create`, course, {
            headers: {
                // authToken: course.authToken
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
}


export default {
    create, 
    // Add other course-related actions here
};