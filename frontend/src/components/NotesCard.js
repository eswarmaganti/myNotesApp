import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { amber, blue, green, pink, indigo } from "@material-ui/core/colors";
import { DeleteRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotes } from "../actions/notesActions";
import editNoteIcon from "../assets/editNoteIcon.svg";
import AlertMessage from "./AlertMessage";
import ProgressBar from "./ProgressBar";
const useStyles = makeStyles((theme) => {
  return {
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardContent: {
      paddingTop: 0,
    },
    noteAvatar: (note) => {
      if (note.categoury === "todos") {
        return { backgroundColor: blue[700] };
      } else if (note.categoury === "remainders") {
        return { backgroundColor: pink[700] };
      } else if (note.categoury === "work") {
        return { backgroundColor: green[700] };
      } else if (note.categoury === "money") {
        return { backgroundColor: amber[700] };
      } else {
        return { backgroundColor: indigo[700] };
      }
    },
    card: (note) => {
      if (note.categoury === "todos") {
        return { backgroundColor: blue[100] };
      } else if (note.categoury === "remainders") {
        return { backgroundColor: pink[100] };
      } else if (note.categoury === "work") {
        return { backgroundColor: green[100] };
      } else if (note.categoury === "money") {
        return { backgroundColor: amber[100] };
      } else {
        return { backgroundColor: indigo[100] };
      }
    },
  };
});

const NotesCard = ({ note, setDeleteNotesLoading }) => {
  const classes = useStyles(note);
  const history = useHistory();

  //redux hooks
  const dispatch = useDispatch();
  const notesDeleted = useSelector((state) => state.notesDeleted);
  const { error, loading } = notesDeleted;
  useEffect(() => {
    setDeleteNotesLoading(loading);
  }, [loading]);
  return (
    <>
      {/* {loading && <ProgressBar />} */}
      {/* // {error && <AlertMessage severity="error" text={error} />} */}
      <Card elevation={0} variant="outlined" className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.noteAvatar}>
              {note.categoury[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              <SvgIcon>
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <path d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z" />
                </g>
              </SvgIcon>
            </IconButton>
          }
          title={note.title}
          subheader={note.categoury.toUpperCase()}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body2">{note.description}</Typography>
        </CardContent>
        <CardActions className={classes.flex} disableSpacing>
          <Button
            size="small"
            color="inherit"
            endIcon={<img src={editNoteIcon} />}
            onClick={() => {
              history.push(`/app/notes/edit/${note._id}`);
            }}
          >
            Edit
          </Button>

          <Button
            color="inherit"
            size="small"
            endIcon={<DeleteRounded />}
            onClick={() => {
              dispatch(deleteNotes(note._id));
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default NotesCard;
