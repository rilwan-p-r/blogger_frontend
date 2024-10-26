import { AuthResponse } from "../interface/authRes.interface";
import Api from "./axiosConfig";
import { handleApiError } from "./handleApiError";
import { handleApiResponse } from "./handleApiResponse";

export const  addBlog = async(blogdata:FormData):Promise<AuthResponse>=>{
    for (const [key, value] of blogdata.entries()) {
        console.log(`${key}: ${value}`);
    }
    return Api.post('post',blogdata,{headers:{
        'Content-Type':'multipart/form-data'
    }})
    .then(handleApiResponse)
    .catch(handleApiError)
};