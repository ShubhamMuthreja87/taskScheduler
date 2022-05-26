export const BASE_API_URL =
	process.env.NEXT_PUBLIC_API_URL || "https://demo.sfcmanagement.in";

export const LOGIN_API_USER = BASE_API_URL + "/user/auth/login";
export const LOGIN_API_MANAGER = BASE_API_URL +"/manager/auth/login"

export const SIGNUP_API_USER = BASE_API_URL + "/user/auth/signup";
export const SIGNUP_API_MANAGER = BASE_API_URL + "/manager/auth/signup";
export const GET_SIGNED_IN_USER = BASE_API_URL +"/manager/auth/currentUser";
export const GET_MANAGER_LIST = BASE_API_URL +"/manager/auth/managerList";