import { LinearProgress, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => {
  return {
    marginBottom: {
      marginBottom: theme.spacing(1),
    },
  };
});

const ProgressBar = () => {
  const classes = useStyles();
  return <LinearProgress className={classes.marginBottom} />;
};

export default ProgressBar;
