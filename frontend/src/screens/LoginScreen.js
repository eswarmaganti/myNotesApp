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

const LoginScreen = () => {
  const classes = useStyles();
  return (
    <AuthContainer
      title="Login"
      subTitle="Access to your account by logging in."
    >
      <Box>
        <form>
          <TextField
            label="Email Address"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
          ></TextField>
          <TextField
            label="password"
            required
            fullWidth
            type="Password"
            variant="filled"
            className={classes.marginBottom}
            size="small"
          ></TextField>
          <Link to="/forgotpassword">
            <Typography
              color="primary"
              align="right"
              className={classes.bold}
              gutterBottom
            >
              Forget Password?
            </Typography>
          </Link>
          <Button
            className={classes.marginBottom}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disableElevation
          >
            submit
          </Button>
        </form>
      </Box>
      <Box display="flex">
        <Typography>Not Registered yet! </Typography>
        <Link to="/signup">
          <Typography
            color="primary"
            style={{ paddingLeft: 10 }}
            className={classes.bold}
          >
            create an account.
          </Typography>
        </Link>
      </Box>
    </AuthContainer>
  );
};

export default LoginScreen;
