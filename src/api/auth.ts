import Api from "./axiosConfig";
import { signupBody } from "../interface/signup.interface";
import { handleApiResponse } from "./handleApiResponse";
import { handleApiError } from "./handleApiError";
import { AuthResponse } from "../interface/authRes.interface";
import { SignInFormValues } from "../interface/signInFormValues.interface";


export const signup = async (body: signupBody): Promise<AuthResponse> => {
    return Api.post('signup', body)
        .then(handleApiResponse)
        .catch(handleApiError)
};

export const signin = async(body:SignInFormValues):Promise<AuthResponse>=>{
    return Api.post('signin',body)
    .then(handleApiResponse)
    .catch(handleApiError)
};