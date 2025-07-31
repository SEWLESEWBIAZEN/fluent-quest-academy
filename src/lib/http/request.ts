import { Axios, AxiosProgressEvent } from "axios";
import { RequestHeaders } from "./request-headers";

/**
 * Generic interface for making typed HTTP API requests.
 */
export interface Request<T = unknown> {  
  url: string; 
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";  
  headers?: RequestHeaders;
  body?: T; 
  params?: Record<string, string | number>;  
  query?: Record<string, string | number | boolean>;  
  timeout?: number;  
  responseType?: "json" | "text" | "blob" | "arraybuffer" | "document"; 
  signal?: AbortSignal;  
  retry?: {    
    attempts: number;    
    delay: number;
  };
  
    /** Progress callback for uploads */ 
  // onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;

  /** Progress callback for downloads */
  // onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  

  /** Custom function to validate response status */
  validateStatus?: (status: number) => boolean;
}
