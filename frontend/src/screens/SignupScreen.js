import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterData, register } from "../actions/userActions";
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

const SignupScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  //reduc hooks
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, message } = userRegister;
  //state hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

  const [nameErrMsg, setNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState("");

  useEffect(() => {
    if (message) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        dispatch(clearRegisterData());
        history.push("/login");
      }, 3000);
    }
  }, [message]);

  const handleRegister = (e) => {
    e.preventDefault();

    //resetting errors
    setNameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);
    setNameErrMsg("");
    setEmailErrMsg("");
    setPasswordErrMsg("");
    setConfirmPasswordErrMsg("");
    //validating empty vals
    if (name === "" || name.length < 3) {
      setNameErr(true);
      setNameErrMsg("Invalid Full Name,length must be 3 or greater !!");
    }
    if (email === "" || email.length < 6) {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email Address,length must be 6 or greater !!");
    }
    if (password === "" || password.length < 6) {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password,length must be 6 or greater !!");
    }
    if (confirmPassword === "" || confirmPassword.length < 6) {
      setConfirmPasswordErr(true);
      setConfirmPasswordErrMsg(
        "Invalid Password,length must be 6 or greater !!"
      );
    }
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length > 6 && !pattern.test(email)) {
      setEmailErr(true);
      setEmailErrMsg("Email Address format is invalid!!");
    }

    if (
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      confirmPassword !== password
    ) {
      setConfirmPasswordErr(true);
      setConfirmPasswordErrMsg(
        "Confirm password doesn't matched with password"
      );
    }

    if (
      !(name === "" || name.length < 3) &&
      !(email === "" || email.length < 6) &&
      !(password === "" || password.length < 3) &&
      !(confirmPassword === "" || confirmPassword.length < 6) &&
      !(email.length > 6 && !pattern.test(email)) &&
      !(
        password.length >= 6 &&
        confirmPassword.length >= 6 &&
        confirmPassword !== password
      )
    ) {
      dispatch(register(name, email, password));
    }
  };

  return (
    <AuthContainer
      title="Sign Up"
      subTitle="Create a new account to access the features of notesapp"
      image={loginsvg}
    >
      <Box>
        {loading && <ProgressBar />}
        {error && <AlertMessage severity="error" text={error} />}
        {message && <AlertMessage severity="success" text={message} />}
        <form noValidate onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
            onChange={(e) => {
              setName(e.target.value);
              setNameErr(false);
              setNameErrMsg("");
            }}
            value={name}
            error={nameErr}
            helperText={nameErrMsg}
          ></TextField>
          <TextField
            label="Email Address"
            required
            fullWidth
            type="text"
            variant="filled"
            className={classes.marginBottom}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
              setEmailErrMsg("");
            }}
            value={email}
            error={emailErr}
            helperText={emailErrMsg}
          ></TextField>
          <TextField
            label="Password"
            required
            fullWidth
            type="password"
            variant="filled"
            className={classes.marginBottom}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
              setPasswordErrMsg("");
            }}
            value={password}
            error={passwordErr}
            helperText={passwordErrMsg}
          ></TextField>
          <TextField
            label="Confirm Password"
            required
            fullWidth
            type="password"
            variant="filled"
            className={classes.marginBottom}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordErr(false);
              setConfirmPasswordErrMsg("");
            }}
            value={confirmPassword}
            error={confirmPasswordErr}
            helperText={confirmPasswordErrMsg}
          ></TextField>

          <Button
            className={classes.marginBottom}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
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
