import axios, { AxiosError } from "axios";
import { AuthResponse } from "../interface/authRes.interface";
import { ApiErrorResponse } from "../interface/apiErrorResponse.interface";

export const handleApiError = (error: unknown): AuthResponse => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.log(axiosError);
        
        return {
            success: false,
            error: axiosError.response?.data?.message || axiosError.message,
            status: axiosError.response?.status
        };
    } else {
        console.error('Unexpected error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
};
