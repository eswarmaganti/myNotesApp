import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/AlertMessage";
import ProgressBar from "../components/ProgressBar";
import AppContainer from "../components/AppContainer";
import NotesForm from "../components/NotesForm";
import { createNotes, clearNotesCreated } from "../actions/notesActions";
import { useHistory } from "react-router-dom";
const AddNotesScreen = () => {
  const history = useHistory();

  //redux hooks
  const dispatch = useDispatch();

  const notesCreated = useSelector((state) => state.notesCreated);
  const { loading, error, message } = notesCreated;

  //state hooks for local state
  const [title, setTitle] = useState("");
  const [categoury, setCategoury] = useState("todos");
  const [description, setDescription] = useState("");

  //state hooks for errors
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  //state hooks for errorMsgs
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [descriptionErrMsg, setDescriptionErrMsg] = useState("");

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearNotesCreated());
        history.push("/app/dashboard");
      }, 1500);
    }
  }, [message, history, dispatch]);

  const handleCreateNote = (e) => {
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
      dispatch(createNotes(title.trim(), description.trim(), categoury.trim()));
    }
  };

  return (
    <AppContainer>
      <Typography variant="h6" gutterBottom>
        Create a New Note
      </Typography>
      {loading && <ProgressBar />}
      {error && <AlertMessage severity="error" text={error} />}
      {message && <AlertMessage severity="success" text={message} />}
      <NotesForm
        handler={handleCreateNote}
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
      />
    </AppContainer>
  );
};

export default AddNotesScreen;
