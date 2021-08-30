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
  PIN_NOTES_REQUEST,
  PIN_NOTES_FAIL,
  PIN_NOTES_SUCCESS,
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
    console.log(data);
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

export const deleteNotes = (id, isPinned) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTES_REQUEST });

    const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/notes/${id}`, config);
    dispatch({
      type: DELETE_NOTES_SUCCESS,
      payload: "Notes Deleted Successfully",
    });
    if (isPinned) {
      const notesPinned = getState().notesLoaded.notesPinned;
      const filteredNotes = notesPinned.filter((note) => note._id !== id);
      dispatch({
        type: LOAD_NOTES_SUCCESS,
        payload: {
          notesPinned: filteredNotes,
          notesOthers: getState().notesLoaded.notesOthers,
        },
      });
    } else {
      const notesOthers = getState().notesLoaded.notesOthers;
      const filteredNotes = notesOthers.filter((note) => note._id !== id);
      dispatch({
        type: LOAD_NOTES_SUCCESS,
        payload: {
          notesPinned: getState().notesLoaded.notesPinned,
          notesOthers: filteredNotes,
        },
      });
    }
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

export const pinNotesAction = (id, isPinned) => async (dispatch, getState) => {
  let tempNote = {};
  let tempNewPinnedNotes = [];
  let tempNewUnPinnedNotes = [];
  try {
    dispatch({ type: PIN_NOTES_REQUEST });

    const { token } = JSON.parse(localStorage.getItem("notesAppUserInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(`/api/notes/pin/${id}`, {}, config);

    dispatch({ type: PIN_NOTES_SUCCESS, message: data });

    if (isPinned) {
      //get the note which is pinned currently
      tempNote = getState().notesLoaded.notesPinned.find(
        (note) => note._id === id
      );
      //make is as unpinned
      tempNote.isPinned = !tempNote.isPinned;

      //filter the newPinnedNotes by deleting the current tempnote
      tempNewPinnedNotes = getState().notesLoaded.notesPinned.filter(
        (note) => note._id !== id
      );

      //push the new pinned note i.e; tempNote to OtherNotes
      tempNewUnPinnedNotes = getState().notesLoaded.notesOthers;
      tempNewUnPinnedNotes.push(tempNote);
      ///prepare the payload
      const payload = {
        notesPinned: tempNewPinnedNotes,
        notesOthers: tempNewUnPinnedNotes,
      };
      //dispatch the LOAD_NOTES ACTION
      dispatch({
        type: LOAD_NOTES_SUCCESS,
        payload: payload,
      });
    } else {
      //get the note which is unpinned currently
      tempNote = getState().notesLoaded.notesOthers.find(
        (note) => note._id === id
      );
      //make is as pinned
      tempNote.isPinned = !tempNote.isPinned;
      //filter the newUnPinnedNotes by deleting the current tempnote
      tempNewUnPinnedNotes = getState().notesLoaded.notesOthers.filter(
        (note) => note._id !== id
      );
      //push the new Unpinned note i.e; tempNote to NotesPinned
      tempNewPinnedNotes = getState().notesLoaded.notesPinned;
      tempNewPinnedNotes.push(tempNote);
      ///prepare the payload
      const payload = {
        notesPinned: tempNewPinnedNotes,
        notesOthers: tempNewUnPinnedNotes,
      };
      //dispatch the LOAD_NOTES ACTION
      dispatch({
        type: LOAD_NOTES_SUCCESS,
        payload: payload,
      });
    }
  } catch (error) {
    dispatch({
      type: PIN_NOTES_FAIL,
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
