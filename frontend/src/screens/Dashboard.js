import { Typography, Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import Masonry from "react-masonry-css";
import AppContainer from "../components/AppContainer";
import ProgressBar from "../components/ProgressBar";
import AlertMessage from "../components/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../actions/notesActions";

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
  const [pinNotesLoading, setPinNotesLoading] = useState(false);
  //redux hooks
  const dispatch = useDispatch();
  const notesLoaded = useSelector((state) => state.notesLoaded);
  const { loading, error, notesOthers, notesPinned } = notesLoaded;
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
        {(loading || deleteNotesLoading || pinNotesLoading) && <ProgressBar />}
        {error && <AlertMessage severity="error" text={error} />}
        {!loading && !notesPinned.length && !notesOthers.length ? (
          <Typography gutterBottom>No Notes created yet!!</Typography>
        ) : (
          <>
            {!loading && (
              <>
                {notesPinned.length ? (
                  <Box className={classes.paddingY}>
                    <Typography gutterBottom>PINNED NOTES</Typography>
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {notesPinned.map((note) => (
                        <NotesCard
                          note={note}
                          key={note._id}
                          setDeleteNotesLoading={setDeleteNotesLoading}
                          setPinNotesLoading={setPinNotesLoading}
                        />
                      ))}
                    </Masonry>
                  </Box>
                ) : (
                  <Typography gutterBottom>NO PINNED NOTES</Typography>
                )}
              </>
            )}
            {!loading && (
              <>
                {notesOthers.length ? (
                  <Box className={classes.paddingY}>
                    <Typography gutterBottom>OTHERS</Typography>
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {notesOthers.map((note) => (
                        <NotesCard
                          note={note}
                          key={note._id}
                          setDeleteNotesLoading={setDeleteNotesLoading}
                          setPinNotesLoading={setPinNotesLoading}
                        />
                      ))}
                    </Masonry>
                  </Box>
                ) : (
                  <Typography gutterBottom>NO OTHER NOTES </Typography>
                )}
              </>
            )}
          </>
        )}
      </>
    </AppContainer>
  );
};

export default Dashboard;
