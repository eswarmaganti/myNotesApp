import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  clearUpdateUserPassword,
} from "../actions/userActions";
import ProgressBar from "../components/ProgressBar";
import AlertMessage from "../components/AlertMessage";
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

  //state hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordErr, setPasswordErr] = useState(false);
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [confirmNewPasswordErr, setConfirmNewPasswordErr] = useState("");

  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState("");
  const [confirmNewPasswordErrMsg, setConfirmNewPasswordErrMsg] = useState("");

  //redux hooks
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const updateUserPassword = useSelector((state) => state.updateUserPassword);
  const { userInfo } = userLogin;
  const { error, message, loading } = updateUserPassword;

  useEffect(() => {
    //initializing the email with logged in user email
    setEmail(userInfo.email);
    if (message) {
      setTimeout(() => {
        //resetting the state
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        //clearing the redux state
        dispatch(clearUpdateUserPassword());
      }, 3000);
    }
  }, [userInfo, message]);

  // method for submitting the request
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    //validations
    if (password === "" || password.length < 6) {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password,length must be 6 or greater !!");
    }
    if (confirmNewPassword === "" || confirmNewPassword.length < 6) {
      setConfirmNewPasswordErr(true);
      setConfirmNewPasswordErrMsg(
        "Invalid confirm new Password,length must be 6 or greater !!"
      );
    }
    if (newPassword === "" || newPassword.length < 6) {
      setNewPasswordErr(true);
      setNewPasswordErrMsg(
        "Invalid new Password,length must be 6 or greater !!"
      );
    }

    if (
      newPassword.length >= 6 &&
      confirmNewPassword.length >= 6 &&
      confirmNewPassword !== newPassword
    ) {
      setConfirmNewPasswordErr(true);
      setConfirmNewPasswordErrMsg(
        "Confirm new password doesn't matched with new password"
      );
    }

    if (
      !(password === "" || password.length < 6) &&
      !(confirmNewPassword === "" || confirmNewPassword.length < 6) &&
      !(newPassword === "" || newPassword.length < 6) &&
      !(
        newPassword.length >= 6 &&
        confirmNewPassword.length >= 6 &&
        confirmNewPassword !== newPassword
      )
    ) {
      dispatch(updatePassword(password.trim(), newPassword.trim()));
    }
  };
  return (
    <AppContainer>
      <Typography gutterBottom color="primary">
        Settings &gt; Update Password
      </Typography>
      <Grid container className={classes.container}>
        <Grid item md={6} className={classes.formSection}>
          <Typography gutterBottom>Update Password</Typography>
          {loading && <ProgressBar />}
          {error && <AlertMessage severity="error" text={error} />}
          {message && <AlertMessage severity="success" text={message} />}
          <form noValidate onSubmit={handleUpdatePassword}>
            <TextField
              variant="filled"
              label="Email Address"
              required
              fullWidth
              value={email}
              disabled
              className={classes.inputFeild}
            />
            <TextField
              variant="filled"
              label="Current Password"
              required
              fullWidth
              className={classes.inputFeild}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr(false);
                setPasswordErrMsg("");
              }}
              value={password}
              error={passwordErr}
              helperText={passwordErrMsg}
              type="password"
            />
            <TextField
              variant="filled"
              label="New Password"
              required
              fullWidth
              className={classes.inputFeild}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordErr(false);
                setNewPasswordErrMsg("");
              }}
              value={newPassword}
              error={newPasswordErr}
              helperText={newPasswordErrMsg}
              type="password"
            />
            <TextField
              variant="filled"
              label="confirm New Password"
              fullWidth
              required
              className={classes.inputFeild}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                setConfirmNewPasswordErr(false);
                setConfirmNewPasswordErrMsg("");
              }}
              value={confirmNewPassword}
              error={confirmNewPasswordErr}
              helperText={confirmNewPasswordErrMsg}
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendRounded />}
              type="submit"
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
