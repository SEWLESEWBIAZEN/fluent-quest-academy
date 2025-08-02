import { apiUrl } from "../envService";
import { RequestHeaders, RequestHeadersWithCourseId, RequestHeadersWithInstructorId } from "@/lib/http/request-headers";
import { Request } from '../http/request'
import { sendRequest } from '../http/client'
import { Course, ResultResponse } from "../types";
import { formatResponse } from "../utils";


export const getAll = async (requestHeaders: RequestHeaders): Promise<ResultResponse<Course[]>> => {
    const request: Request<null> = {
        url: `${apiUrl}/courses/getAll`,
        method: "GET",
        headers: requestHeaders,
        responseType: "json",
    };
    try {
        const response = await sendRequest<ResultResponse<Course[]>>(request);        
        return formatResponse({
            statusCode: response?.data?.statusCode,
            data: response?.data?.data,
            success: response?.data?.success,
            message: response?.data?.message
        });

    } catch (error: any) {
        return formatResponse({
            statusCode: error?.response?.data?.statusCode,
            data: [],
            success: false,
            message: error?.response?.data?.message || "Error fetching all courses"
        });       
    }
};


const getByInstructor = async (requestHeaders: RequestHeadersWithInstructorId): Promise<ResultResponse<Course[]>> => {
    const { instructorId, authToken } = requestHeaders;

    const request: Request<null> = {
        url: `${apiUrl}/courses/getByInstructor/${instructorId}`,
        method: "GET",
        headers: {
            authToken: authToken,
        },
        responseType: "json",
    };

    try {
        const response = await sendRequest<ResultResponse<Course[]>>(request);
        return formatResponse({
            statusCode: response?.data?.statusCode,
            data: response?.data?.data,
            success: response?.data?.success,
            message: response?.data?.message
        });
    } catch (error: any) {
        return formatResponse({
            statusCode: error?.response?.data?.statusCode,
            data: [],
            success: false,
            message: error?.response?.data?.message || "Error fetching courses by instructor"
        });
    }
};


const getById = async (requestHeaders: RequestHeadersWithCourseId): Promise<ResultResponse<Course>> => {
    const { courseId, authToken } = requestHeaders;
    const request: Request<null> = {
        url: `${apiUrl}/courses/getById/${courseId}`,
        method: "GET",
        headers: {
            authToken: authToken,
        },
        responseType: "json",
    };

    try {
        const response = await sendRequest<ResultResponse<Course>>(request);
        return formatResponse({
            statusCode: response?.data?.statusCode,
            data: response?.data?.data,
            success: response?.data?.success,
            message: response?.data?.message
        });
    } catch (error: any) {
        return formatResponse({
            statusCode: error?.response?.data?.statusCode,
            data: null,
            success: false,
            message: error?.response?.data?.message || "Error fetching course by ID"
        });
    }
};

export default {
    getAll,
    getByInstructor,
    getById
};
