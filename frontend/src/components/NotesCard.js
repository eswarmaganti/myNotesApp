import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { amber, blue, green, pink, indigo } from "@material-ui/core/colors";
import { DeleteRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotes, pinNotesAction } from "../actions/notesActions";
import editNoteIcon from "../assets/editNoteIcon.svg";
import pinOutlined from "../assets/pinOutlined.svg";
import pinFilled from "../assets/pinRoundedFilled.svg";
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

const NotesCard = ({ note, setDeleteNotesLoading, setPinNotesLoading }) => {
  const classes = useStyles(note);
  const history = useHistory();

  //redux hooks
  const dispatch = useDispatch();
  const notesDeleted = useSelector((state) => state.notesDeleted);
  const { loading } = notesDeleted;
  const pinNotes = useSelector((state) => state.pinNotes);
  useEffect(() => {
    setDeleteNotesLoading(loading);
    setPinNotesLoading(pinNotes.loading);
  }, [loading, pinNotes.loading, setDeleteNotesLoading, setPinNotesLoading]);
  return (
    <>
      <Card elevation={0} variant="outlined" className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.noteAvatar}>
              {note.categoury[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => {
                dispatch(pinNotesAction(note._id, note.isPinned));
              }}
            >
              {note.isPinned ? (
                <img src={pinFilled} alt="icon" />
              ) : (
                <img src={pinOutlined} alt="icon" />
              )}
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
            endIcon={<img src={editNoteIcon} alt="icon" />}
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
              dispatch(deleteNotes(note._id, note.isPinned));
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
