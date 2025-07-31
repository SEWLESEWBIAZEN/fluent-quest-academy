import axios, { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";
import { Request } from "./request";

export async function sendRequest<TResponse = any, TBody = any>(
    request: Request<TBody>
): Promise<AxiosResponse<TResponse>> {
    const {
        url,
        method,
        headers,
        body,
        params,
        query,
        timeout,
        responseType,
        signal,
        retry,
        onUploadProgress,
        onDownloadProgress,
        validateStatus,
    } = request;

    const config: AxiosRequestConfig = {
        url,
        method,
        headers: headers as Record<string, string>,
        data: body,
        params: { ...params, ...query },
        timeout,
        responseType,
        signal,
        onUploadProgress:  (progressEvent: AxiosProgressEvent) => onUploadProgress(progressEvent),
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => onDownloadProgress(progressEvent),
        validateStatus,
    };

    let attempts = 0;
    const maxAttempts = retry?.attempts ?? 1;
    const delay = retry?.delay ?? 0;

    while (attempts < maxAttempts) {
        try {
            return await axios.request<TResponse>(config);
        } catch (error: any) {
            attempts++;
            const shouldRetry =
                attempts < maxAttempts &&
                (!error.response || (validateStatus && !validateStatus(error.response.status)));

            if (!shouldRetry) throw error;
            await new Promise((res) => setTimeout(res, delay));
        }
    }

    throw new Error("Request failed after max retry attempts");
}
