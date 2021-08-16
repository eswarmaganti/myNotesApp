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
import { DeleteRounded, EditRounded } from "@material-ui/icons";
import React from "react";
import editNoteIcon from "../assets/editNoteIcon.svg";
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
  };
});

const NotesCard = () => {
  const classes = useStyles();
  return (
    <Card elevation={0} variant="outlined" className={classes.card}>
      <CardHeader
        avatar={<Avatar>T</Avatar>}
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
        title="Complete the Work before Deadline"
        subheader="REMAINDER"
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
          consequatur! Lorem ipsum dolor sit amet.
        </Typography>
      </CardContent>
      <CardActions className={classes.flex} disableSpacing>
        <Button
          size="small"
          color="inherit"
          endIcon={<img src={editNoteIcon} />}
          variant="outlined"
        >
          Edit
        </Button>

        <Button
          color="inherit"
          size="small"
          endIcon={<DeleteRounded />}
          variant="outlined"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotesCard;
