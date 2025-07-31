import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatResponse({ statusCode, data, success, message }) {
  const formattedResponse = {
    statusCode: Number(statusCode),
    data,
    success,
    message
  }
  return formattedResponse;
}
