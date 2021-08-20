import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
const useStyles = makeStyles((theme) => {
  return {
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
  };
});

const AlertMessage = ({ severity, text }) => {
  const classes = useStyles();
  return (
    <Alert className={classes.marginBottom} severity={severity}>
      {text}
    </Alert>
  );
};

export default AlertMessage;
