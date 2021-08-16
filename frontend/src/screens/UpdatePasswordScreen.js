import React from "react";
import AppContainer from "../components/AppContainer";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import settingsImg from "../assets/settings.svg";
const useStyles = makeStyles((theme) => {
  return {
    inputFeild: {
      marginBottom: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(2),
    },
    container: {
      minHeight: "inherit",
      paddingTop: theme.spacing(4),
    },
    imageSection: {
      position: "relative",
    },
    formSection: {
      paddingRight: theme.spacing(3),
    },
    image: {
      width: "100%",
      objectFit: "cover",
    },
  };
});

const UpdatePasswordScreen = () => {
  const classes = useStyles();
  return (
    <AppContainer>
      <Typography gutterBottom color="primary">
        Settings &gt; Update Password
      </Typography>
      <Grid container className={classes.container}>
        <Grid item md={6} className={classes.formSection}>
          <Typography gutterBottom>Update Password</Typography>

          <form noValidate>
            <TextField
              variant="filled"
              label="Email Address"
              required
              fullWidth
              value="maganti.ek@gmail.com"
              disabled
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="Current Password"
              required
              fullWidth
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="New Password"
              required
              fullWidth
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="confirm New Password"
              fullWidth
              required
              className={classes.inputFeild}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendRounded />}
            >
              Update Password
            </Button>
          </form>
        </Grid>
        <Grid item md={6} className={classes.imageSection}>
          <img src={settingsImg} alt="image" className={classes.image} />
        </Grid>
      </Grid>
    </AppContainer>
  );
};

export default UpdatePasswordScreen;
