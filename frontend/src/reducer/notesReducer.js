import {
  LOAD_NOTES_REQUEST,
  LOAD_NOTES_SUCCESS,
  LOAD_NOTES_FAIL,
  CREATE_NOTES_FAIL,
  CREATE_NOTES_REQUEST,
  CREATE_NOTES_SUCCESS,
  EDIT_NOTES_FAIL,
  EDIT_NOTES_REQUEST,
  EDIT_NOTES_SUCCESS,
  DELETE_NOTES_FAIL,
  DELETE_NOTES_REQUEST,
  DELETE_NOTES_SUCCESS,
  DELETE_NOTES_CLEAR,
  LOAD_NOTE_FAIL,
  LOAD_NOTE_REQUEST,
  LOAD_NOTE_SUCCESS,
  CREATE_NOTES_CLEAR,
  EDIT_NOTES_CLEAR,
  PIN_NOTES_REQUEST,
  PIN_NOTES_SUCCESS,
  PIN_NOTES_FAIL,
} from "../constants/notesConstants";

export const notesLoadReducer = (
  state = { notesPinned: [], notesOthers: [] },
  action
) => {
  switch (action.type) {
    case LOAD_NOTES_REQUEST:
      return { loading: true, notesPinned: [], notesOthers: [] };
    case LOAD_NOTES_SUCCESS:
      return {
        loading: false,
        notesOthers: action.payload.notesOthers,
        notesPinned: action.payload.notesPinned,
      };
    case LOAD_NOTES_FAIL:
      return {
        loading: false,
        error: action.payload,
        notesPinned: [],
        notesOthers: [],
      };
    default:
      return state;
  }
};

export const createNotesReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTES_REQUEST:
      return { loading: true };
    case CREATE_NOTES_SUCCESS:
      return { loading: false, message: action.payload };
    case CREATE_NOTES_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_NOTES_CLEAR:
      return { loading: false };
    default:
      return state;
  }
};

export const editNotesReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_NOTES_REQUEST:
      return { loading: true, notesData: action.payload };
    case EDIT_NOTES_SUCCESS:
      return {
        loading: false,
        message: action.payload,
        notesData: action.notesData,
      };
    case EDIT_NOTES_FAIL:
      return {
        loading: false,
        error: action.payload,
        notesData: action.notesData,
      };
    case LOAD_NOTE_REQUEST:
      return { loading: true };
    case LOAD_NOTE_SUCCESS:
      return { loading: false, notesData: action.payload };
    case LOAD_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_NOTES_CLEAR:
      return { loading: false, notesData: {} };
    default:
      return {};
  }
};

export const deleteNotesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTES_REQUEST:
      return { loading: true };
    case DELETE_NOTES_SUCCESS:
      return { loading: false };
    case DELETE_NOTES_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_NOTES_CLEAR:
      return {};
    default:
      return state;
  }
};

export const pinNotesReducer = (state = {}, action) => {
  switch (action.type) {
    case PIN_NOTES_REQUEST:
      return { loading: true };
    case PIN_NOTES_SUCCESS:
      return { loading: false, message: action.payload };
    case PIN_NOTES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
