import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";

import { login } from "../actions/userActions";
import AlertMessage from "../components/AlertMessage";
import ProgressBar from "../components/ProgressBar";
import loginsvg from "../assets/login.svg";

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
  const location = useLocation();
  const history = useHistory();

  //redux hooks
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  //state hooks for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  //redirect varaible for page redirection after login

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/app/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  //login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setEmailErr(false);
    setPasswordErr(false);
    setEmailErrMsg("");
    setPasswordErrMsg("");
    if (email == "" || email === undefined) {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email Address,email can not be empty!!");
    }
    if (password === "" || password === undefined) {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password,password can not be empty!!");
    }

    //validating data
    if (email.length < 6) {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email Address,length must be 6 or high!!");
    }
    //pattern for validating email
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length > 6 && !pattern.test(email)) {
      setEmailErr(true);
      setEmailErrMsg("Email Address format is invalid!!");
    }
    if (password.length < 6) {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password,length must be 6 or high!!");
    }
    if (
      !(email == "" || email === undefined) &&
      !(password === "" || password === undefined) &&
      !(email.length > 6 && !pattern.test(email)) &&
      !(password.length < 6)
    ) {
      dispatch(login(email.trim(), password.trim()));
    }
  };

  return (
    <AuthContainer
      title="Login"
      subTitle="Access to your account by logging in."
      image={loginsvg}
    >
      <Box>
        {loading && <ProgressBar />}
        {error && <AlertMessage severity="error" text={error} />}
        <form noValidate onSubmit={handleLogin}>
          <TextField
            label="Email Address"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
            value={email}
            error={emailErr}
            helperText={emailErrMsg}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
              setEmailErrMsg("");
            }}
          ></TextField>
          <TextField
            label="password"
            required
            fullWidth
            type="Password"
            variant="filled"
            className={classes.marginBottom}
            value={password}
            error={passwordErr}
            helperText={passwordErrMsg}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
              setPasswordErrMsg("");
            }}
          ></TextField>
          <Link to="/forgotPassword">
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
            type="submit"
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
