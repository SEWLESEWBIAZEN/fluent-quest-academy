
import { apiUrl } from "../envService";
import { RequestHeaders} from "@/lib/http/request-headers";
import { Request } from '../http/request'
import { sendRequest } from '../http/client'
import {  Language, ResultResponse } from "../types";
import { formatResponse } from "../utils";

 const getAll = async (requestHeaders: RequestHeaders): Promise<ResultResponse<Language[]>> => {
    const request: Request<null> = {
        url: `${apiUrl}/languages/getAll`,
        method: "GET",
        headers: requestHeaders,
        responseType: "json",
    };
    try {
        const response = await sendRequest<ResultResponse<Language[]>>(request);
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
            message: error?.response?.data?.message || "Error fetching all languages"
        });
    }
};

export default {
    getAll
};