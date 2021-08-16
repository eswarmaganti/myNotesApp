import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import AppContainer from "../components/AppContainer";
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

const UpdateProfileScreen = () => {
  const classes = useStyles();
  return (
    <AppContainer>
      <Typography gutterBottom color="primary">
        Settings &gt; Update Profile
      </Typography>

      <Grid container className={classes.container}>
        <Grid item md={6} className={classes.formSection}>
          <Typography gutterBottom>Update Profile</Typography>
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
              label="Full Name"
              fullWidth
              required
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="Your Bio"
              multiline
              rows={3}
              required
              fullWidth
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="Country"
              required
              fullWidth
              className={classes.inputFeild}
            />

            <Button
              variant="contained"
              color="primary"
              endIcon={<SendRounded />}
            >
              Update Profile
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

export default UpdateProfileScreen;
