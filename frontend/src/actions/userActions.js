import axios from "axios";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  CLEAR_REGISTER_DATA,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_CLEAR,
  UPDATE_USER_PROFILE_CLEAR,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_LOCAL_USER_DATA,
  USER_VERIFICATIONCODE_REQUEST,
  USER_VERIFICATIONCODE_SUCCESS,
  USER_VERIFICATIONCODE_FAIL,
  USER_VALIDATE_VC_REQUEST,
  USER_VALIDATE_VC_FAIL,
  USER_VALIDATE_VC_SUCCESS,
  USER_RESET_PASS_FAIL,
  USER_RESET_PASS_REQUEST,
  USER_RESET_PASS_SUCCESS,
  CLEAR_RESET_PASS,
  CLEAR_VERIFICATION_CODE,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );
    localStorage.setItem("notesAppUserInfo", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("notesAppUserInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user",
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePassword =
  (password, newPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });

      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/user/profile`,
        { password, newPassword },
        config
      );
      dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfile =
  (name, bio, location, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/user/profile`,
        { name, bio, location, password },
        config
      );

      //dispatching a new action to update the local user logininfo and updatin the value on localStorage
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//for forgot password
export const getVerificationCode = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFICATIONCODE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/getVerificationCode",
      { email },
      config
    );

    dispatch({ type: USER_VERIFICATIONCODE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_VERIFICATIONCODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const validateVerificationCode = (email, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_VALIDATE_VC_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/validateVC",
      { email, token },
      config
    );

    dispatch({ type: USER_VALIDATE_VC_SUCCESS, payload: data, email: email });
  } catch (error) {
    dispatch({
      type: USER_VALIDATE_VC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPasswordAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/resetPassword",
      { email, password },
      config
    );

    dispatch({ type: USER_RESET_PASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearRegisterData = () => (dispatch) => {
  dispatch({ type: CLEAR_REGISTER_DATA });
};
export const clearUpdateUserPassword = () => (dispatch) => {
  dispatch({ type: UPDATE_USER_PASSWORD_CLEAR });
};
export const clearUpdateUserProfile = () => (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_CLEAR });
};

export const clearVCandResetPass = () => (dispatch) => {
  dispatch({ type: CLEAR_VERIFICATION_CODE });
  dispatch({ type: CLEAR_RESET_PASS });
};
