import { AuthResponse } from "../interface/authRes.interface";
import Api from "./axiosConfig";
import { handleApiError } from "./handleApiError";
import { handleApiResponse } from "./handleApiResponse";

export const  updateBlog = async(id:string, blogdata:FormData):Promise<AuthResponse>=>{
    return Api.put(`post/${id}`,blogdata,{headers:{
        'Content-Type':'multipart/form-data'
    }})
    .then(handleApiResponse)
    .catch(handleApiError)
};