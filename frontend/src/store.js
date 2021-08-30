import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  resetPasswordReducer,
  updateUserPasswordReducer,
  updateUserProfileReducer,
  userLoginReducer,
  userRegisterReducer,
  verificationCodeReducer,
} from "./reducer/userReducer";
import {
  createNotesReducer,
  editNotesReducer,
  notesLoadReducer,
  deleteNotesReducer,
  pinNotesReducer,
} from "./reducer/notesReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  notesLoaded: notesLoadReducer,
  notesCreated: createNotesReducer,
  notesEdited: editNotesReducer,
  notesDeleted: deleteNotesReducer,
  updateUserPassword: updateUserPasswordReducer,
  updateUserProfile: updateUserProfileReducer,
  verificationCode: verificationCodeReducer,
  resetPassword: resetPasswordReducer,
  pinNotes: pinNotesReducer,
});

//getting data from localstorage
const userInfoFromStorage = localStorage.getItem("notesAppUserInfo")
  ? JSON.parse(localStorage.getItem("notesAppUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
