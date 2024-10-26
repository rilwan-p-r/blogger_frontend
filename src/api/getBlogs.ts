import { AuthResponse } from "../interface/authRes.interface";
import Api from "./axiosConfig";
import { handleApiError } from "./handleApiError";
import { handleApiResponse } from "./handleApiResponse";

export const getAllBlogs = async():Promise<AuthResponse>=>{
    return Api.get('post')
    .then(handleApiResponse)
    .catch(handleApiError)
}