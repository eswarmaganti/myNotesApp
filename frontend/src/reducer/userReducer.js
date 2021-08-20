import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_LOGOUT,
  CLEAR_REGISTER_DATA,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_CLEAR,
  UPDATE_USER_PASSWORD_CLEAR,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_LOCAL_USER_DATA,
  USER_VERIFICATIONCODE_FAIL,
  USER_VERIFICATIONCODE_REQUEST,
  USER_VERIFICATIONCODE_SUCCESS,
  USER_VALIDATE_VC_REQUEST,
  USER_VALIDATE_VC_SUCCESS,
  USER_VALIDATE_VC_FAIL,
  USER_RESET_PASS_SUCCESS,
  USER_RESET_PASS_REQUEST,
  USER_RESET_PASS_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, userInfo: null };
    case UPDATE_LOCAL_USER_DATA:
      return { loading: false, userInfo: action.payload };
    case USER_LOGOUT:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = [], action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, message: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_REGISTER_DATA:
      return { loading: false };
    default:
      return {};
  }
};

export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, message: action.payload };
    case UPDATE_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_PROFILE_CLEAR:
      return {};
    default:
      return {};
  }
};
export const updateUserPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PASSWORD_REQUEST:
      return { loading: true };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };
    case UPDATE_USER_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_PASSWORD_CLEAR:
      return {};
    default:
      return {};
  }
};

export const verificationCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFICATIONCODE_REQUEST:
      return { loading: true, email: action.payload };
    case USER_VERIFICATIONCODE_SUCCESS:
      return { loading: false, message: action.payload, vcSent: true };
    case USER_VERIFICATIONCODE_FAIL:
      return { loading: false, error: action.payload };
    case USER_VALIDATE_VC_REQUEST:
      return { loading: true };
    case USER_VALIDATE_VC_SUCCESS:
      return { loading: false, message: action.payload, vcVerified: true };
    case USER_VALIDATE_VC_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASS_REQUEST:
      return { loading: true };
    case USER_RESET_PASS_SUCCESS:
      return { loading: false, message: action.payload };
    case USER_RESET_PASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
