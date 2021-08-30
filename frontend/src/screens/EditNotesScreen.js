import React, { useEffect, useState } from "react";
import AppContainer from "../components/AppContainer";
import NotesForm from "../components/NotesForm";
import { Typography } from "@material-ui/core";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getNoteById,
  clearNotesEdited,
  editNotes,
} from "../actions/notesActions";
import ProgressBar from "../components/ProgressBar";

const EditNotesScreen = () => {
  const { id } = useParams();
  const history = useHistory();

  //redux hooks
  const dispatch = useDispatch();

  //reducer hook for saving the edited note to db
  const notesEdited = useSelector((state) => state.notesEdited);
  const { loading, error, message, notesData } = notesEdited;

  //state hooks
  const [title, setTitle] = useState("");
  const [categoury, setCategoury] = useState("");
  const [description, setDescription] = useState("");

  //state hooks for errors
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  //state hooks for errorMsgs
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [descriptionErrMsg, setDescriptionErrMsg] = useState("");

  useEffect(() => {
    if (notesData) {
      setTitle(notesData.title);
      setCategoury(notesData.categoury);
      setDescription(notesData.description);
    } else {
      dispatch(getNoteById(id));
    }

    if (message) {
      setTimeout(() => {
        dispatch(clearNotesEdited());
        history.push("/app/dashboard");
      }, 3000);
    }
  }, [notesData, id, dispatch, history, message]);

  const handleEditNotes = (e) => {
    e.preventDefault();
    setTitleErr(false);
    setDescriptionErr(false);
    setTitleErrMsg("");
    setDescriptionErrMsg("");
    //validating data
    if (title === "" || title.length < 3) {
      setTitleErr(true);
      setTitleErrMsg("Invalid Title for notes,length should be 3 or high!!");
    }
    if (description === "" || description.length < 5) {
      setDescriptionErr(true);
      setDescriptionErrMsg(
        "Invalid Description for notes,length should be 5 or high!!"
      );
    }

    if (
      !(title === "" || title.length < 3) &&
      !(description === "" || description.length < 5)
    ) {
      dispatch(
        editNotes(id, title.trim(), description.trim(), categoury.trim())
      );
    }
  };

  return (
    <AppContainer>
      <Typography variant="h6">Edit Notes here</Typography>
      {loading && <ProgressBar />}
      {message && <AlertMessage severity="success" text={message} />}
      {error && <AlertMessage severity="error" text={error} />}
      <NotesForm
        handler={handleEditNotes}
        title={title}
        description={description}
        categoury={categoury}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategoury={setCategoury}
        titleErr={titleErr}
        descriptionErr={descriptionErr}
        descriptionErrMsg={descriptionErrMsg}
        titleErrMsg={titleErrMsg}
        setTitleErr={setTitleErr}
        setDescriptionErr={setDescriptionErr}
        setTitleErrMsg={setTitleErrMsg}
        setDescriptionErrMsg={setDescriptionErrMsg}
        loading={loading}
      />
    </AppContainer>
  );
};

export default EditNotesScreen;
