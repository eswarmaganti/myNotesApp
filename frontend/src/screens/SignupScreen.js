import {
  Box,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
const useStyles = makeStyles((theme) => {
  return {
    boldText: {
      fontWeight: "bold",
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    bold: {
      fontWeight: "500",
    },
  };
});

const SignupScreen = () => {
  const classes = useStyles();
  return (
    <AuthContainer
      title="Sign Up"
      subTitle="Create a new account to access the features of notesapp"
    >
      <Box>
        <form>
          <TextField
            label="Full Name"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
          ></TextField>
          <TextField
            label="Email Address"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
          ></TextField>
          <TextField
            label="Password"
            required
            fullWidth
            type="password"
            variant="filled"
            className={classes.marginBottom}
            size="small"
          ></TextField>
          <TextField
            label="Confirm Password"
            required
            fullWidth
            type="password"
            variant="filled"
            className={classes.marginBottom}
            size="small"
          ></TextField>

          <Button
            className={classes.marginBottom}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disableElevation
          >
            signup
          </Button>
        </form>
      </Box>
      <Box display="flex">
        <Typography>Already have an account! </Typography>
        <Link to="/login">
          <Typography
            color="primary"
            style={{ paddingLeft: 10 }}
            className={classes.bold}
          >
            login to your account.
          </Typography>
        </Link>
      </Box>
    </AuthContainer>
  );
};

export default SignupScreen;
