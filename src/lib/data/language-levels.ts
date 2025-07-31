import { apiUrl } from "../envService";
import { RequestHeaders} from "@/lib/http/request-headers";
import { Request } from '../http/request'
import { sendRequest } from '../http/client'
import {  LanguageLevel, ResultResponse } from "../types";
import { formatResponse } from "../utils";

export const getAll = async (requestHeaders: RequestHeaders): Promise<ResultResponse<LanguageLevel[]>> => {
    const request: Request<null> = {
        url: `${apiUrl}/languageLevels/getAll`,
        method: "GET",
        headers: requestHeaders,
        responseType: "json",
    };
    try {
        const response = await sendRequest<ResultResponse<LanguageLevel[]>>(request);
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

export default {
    getAll
};