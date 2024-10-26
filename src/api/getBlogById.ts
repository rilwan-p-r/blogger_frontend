 import { AuthResponse } from "../interface/authRes.interface";
import Api from "./axiosConfig";
import { handleApiError } from "./handleApiError";
import { handleApiResponse } from "./handleApiResponse";

 export const getBlogById = async(id:string|undefined):Promise<AuthResponse>=>{
    return Api.get(`post/${id}`)
    .then(handleApiResponse)
    .catch(handleApiError)
 };