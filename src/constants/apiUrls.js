export const BASE_API_URL =
	process.env.NEXT_PUBLIC_API_URL || "https://demo.sfcmanagement.in";

export const LOGIN_API_USER = BASE_API_URL + "/user/auth/login";
export const LOGIN_API_MANAGER = BASE_API_URL +"/manager/auth/login"

export const SIGNUP_API_USER = BASE_API_URL + "/user/auth/signup";
export const SIGNUP_API_MANAGER = BASE_API_URL + "/manager/auth/signup";
export const GET_SIGNED_IN_USER = BASE_API_URL +"/manager/auth/currentUser";
export const GET_MANAGER_LIST = BASE_API_URL +"/manager/auth/managerList";

export const GET_TASK_BY_USER_ID=BASE_API_URL+"/user/ops/taskByUserId";
export const CREATE_TASK=BASE_API_URL+"/manager/ops/createTask";
export const GET_USER_BY_MANAGER_ID=BASE_API_URL+"/manager/ops/userByManagerId";
export const MARK_AS_DONE=BASE_API_URL+"/user/ops/markAsDone";
export const MARK_AS_APPROVED=BASE_API_URL+"/manager/ops/markAsApproved";
export const GET_UNAPPROVED_LIST=BASE_API_URL+"/manager/ops/unApprovedUserByManagerId";
export const GET_TASK_BY_MANAGER_ID=BASE_API_URL+"/manager/ops/taskByManagerId";

