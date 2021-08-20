import { Typography, Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import Masonry from "react-masonry-css";
import AppContainer from "../components/AppContainer";
import ProgressBar from "../components/ProgressBar";
import AlertMessage from "../components/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { deleteNotes, getNotes } from "../actions/notesActions";

const useStyles = makeStyles((theme) => {
  return {
    paddingY: {
      padding: `${theme.spacing(2)}px 0`,
    },
  };
});

const Dashboard = () => {
  const classes = useStyles();

  const [deleteNotesLoading, setDeleteNotesLoading] = useState(false);
  //redux hooks
  const dispatch = useDispatch();
  const notesLoaded = useSelector((state) => state.notesLoaded);
  const { loading, error, notes } = notesLoaded;
  const notesDeleted = useSelector((state) => state.notesDeleted);
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <AppContainer>
      <>
        {(loading || deleteNotesLoading) && <ProgressBar />}
        {/* <Typography variant="h6" gutterBottom>
          My Notes
        </Typography> */}
        {notes && (
          <Box className={classes.paddingY}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {notes.map((note) => (
                <NotesCard
                  note={note}
                  key={note._id}
                  setDeleteNotesLoading={setDeleteNotesLoading}
                />
              ))}
            </Masonry>
          </Box>
        )}
        {error && <AlertMessage severity="error" text={error} />}
      </>
    </AppContainer>
  );
};

export default Dashboard;
