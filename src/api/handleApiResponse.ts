import { AxiosResponse } from "axios";
import { AuthResponse } from "../interface/authRes.interface";



export const handleApiResponse = (response: AxiosResponse): AuthResponse => {
    console.log(handleApiResponse);
    
    return {
        success: true,
        data: response.data,
        status: response.status
    };
};