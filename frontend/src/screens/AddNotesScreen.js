import React, { useState } from "react";

import AppContainer from "../components/AppContainer";
import NotesForm from "../components/NotesForm";

const AddNotesScreen = () => {
  const [title, setTitle] = useState("");
  const [categoury, setCategoury] = useState("todos");
  const [description, setDescription] = useState("");

  //state hooks for errors
  const [titleErr, setTitleErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  //state hooks for errorMsgs
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [descriptionErrMsg, setDescriptionErrMsg] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();
  };

  return (
    <AppContainer>
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
      />
    </AppContainer>
  );
};

export default AddNotesScreen;
