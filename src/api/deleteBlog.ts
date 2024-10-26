import { AuthResponse } from "../interface/authRes.interface";
import Api from "./axiosConfig";
import { handleApiError } from "./handleApiError";
import { handleApiResponse } from "./handleApiResponse";

export const deleteBlog = async (id: string): Promise<AuthResponse> => {
    return Api.delete(`post/${id}`)
        .then(handleApiResponse)
        .catch(handleApiError)
};