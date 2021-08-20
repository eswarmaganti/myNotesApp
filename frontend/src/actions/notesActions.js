import axios from "axios";
import {
  CREATE_NOTES_FAIL,
  CREATE_NOTES_REQUEST,
  CREATE_NOTES_SUCCESS,
  LOAD_NOTES_REQUEST,
  LOAD_NOTES_SUCCESS,
  LOAD_NOTE_FAIL,
  CREATE_NOTES_CLEAR,
  EDIT_NOTES_CLEAR,
  EDIT_NOTES_FAIL,
  EDIT_NOTES_REQUEST,
  EDIT_NOTES_SUCCESS,
  LOAD_NOTE_REQUEST,
  LOAD_NOTE_SUCCESS,
  LOAD_NOTES_FAIL,
  DELETE_NOTES_CLEAR,
  DELETE_NOTES_FAIL,
  DELETE_NOTES_REQUEST,
  DELETE_NOTES_SUCCESS,
} from "../constants/notesConstants";

export const getNotes = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_NOTES_REQUEST });

    const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/notes", config);

    dispatch({ type: LOAD_NOTES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_NOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.messgae
          : error.message,
    });
  }
};

export const createNotes =
  (title, description, categoury) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_NOTES_REQUEST });

      const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/notes",
        { title, description, categoury },
        config
      );

      dispatch({ type: CREATE_NOTES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_NOTES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editNotes =
  (id, title, description, categoury) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_NOTES_REQUEST,
        payload: { title, description, categoury },
      });

      const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/notes/${id}`,
        { title, description, categoury },
        config
      );

      dispatch({
        type: EDIT_NOTES_SUCCESS,
        payload: data,
        notesData: { title, categoury, description },
      });
    } catch (error) {
      dispatch({
        type: EDIT_NOTES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        notesData: { title, categoury, description },
      });
    }
  };

export const getNoteById = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_NOTE_REQUEST });
    const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/notes/${id}`, config);

    dispatch({ type: LOAD_NOTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_NOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.messgae
          : error.message,
    });
  }
};

export const deleteNotes = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTES_REQUEST });

    const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);
    dispatch({
      type: DELETE_NOTES_SUCCESS,
      payload: "Notes Deleted Successfully",
    });
    const notes = getState().notesLoaded.notes;
    const filteredNotes = notes.filter((note) => note._id !== id);
    dispatch({ type: LOAD_NOTES_SUCCESS, payload: filteredNotes });
  } catch (error) {
    dispatch({
      type: DELETE_NOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearNotesCreated = () => (dispatch) => {
  dispatch({ type: CREATE_NOTES_CLEAR });
};
export const clearNotesEdited = () => (dispatch) => {
  dispatch({ type: EDIT_NOTES_CLEAR });
};

export const clearNotesDeleted = () => (dispatch) => {
  dispatch({ type: DELETE_NOTES_CLEAR });
};
