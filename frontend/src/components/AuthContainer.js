import { makeStyles } from "@material-ui/core";
import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import loginsvg from "../assets/login.svg";

const useStyles = makeStyles((theme) => {
  return {
    authSection: {
      padding: `${theme.spacing(3)}px ${theme.spacing(7)}px`,
    },
    boldText: {
      fontWeight: "bold",
    },
    title: {
      marginBottom: theme.spacing(6),
    },
    imageSection: {
      position: "relative",
      padding: `${theme.spacing(3)}px ${theme.spacing(7)}px`,
    },
    image: {
      objectFit: "contain",
      width: "100%",
    },
    authScreen: {
      minHeight: "inherit",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

const FormContainer = ({ title, subTitle, children }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.authScreen}>
      <Grid item className={classes.authSection} sm={6} xs={12}>
        <Box className={classes.title}>
          <Typography
            gutterBottom
            variant="h4"
            color="primary"
            className={classes.boldText}
          >
            {title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {subTitle}
          </Typography>
        </Box>
        {children}
      </Grid>
      <Grid item className={classes.imageSection} sm={6} xs={12}>
        <img src={loginsvg} className={classes.image} />
      </Grid>
    </Grid>
  );
};

export default FormContainer;
