import { makeStyles, Box, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AuthContainer from "../components/AuthContainer";
import { SendRounded } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import resetpassImg from "../assets/resetpass.svg";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import AlertMessage from "../components/AlertMessage";

import {
  resetPasswordAction,
  clearVCandResetPass,
} from "../actions/userActions";

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
const ResetPasswordScreen = ({ history }) => {
  const classes = useStyles();

  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState("");

  //redux hooks
  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword);
  const { error, loading, message } = resetPassword;

  useEffect(() => {
    if (message) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        dispatch(clearVCandResetPass());
        history.push("/login");
      }, 3000);
    }
  }, [message]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setPasswordErr(false);
    setPasswordErrMsg("");
    setConfirmPasswordErr(false);
    setConfirmPasswordErrMsg("");

    //validation
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

    //dispatch action
    if (
      !(password === "" || password.length < 6) &&
      !(confirmPassword === "" || confirmPassword.length < 6) &&
      !(
        password.length >= 6 &&
        confirmPassword.length >= 6 &&
        confirmPassword !== password
      )
    ) {
      dispatch(resetPasswordAction(email.trim(), password.trim()));
    }
  };

  return (
    <AuthContainer
      title="Reset Your Password"
      subTitle="please reset your password by creating a new password!!"
      image={resetpassImg}
    >
      <Box>
        {loading && <ProgressBar />}
        {error && <AlertMessage severity="error" text={error} />}
        {message && <AlertMessage severity="success" text={message} />}
        <form noValidate onSubmit={handleResetPassword}>
          <TextField
            required
            label="Email Address"
            fullWidth
            className={classes.marginBottom}
            type="email"
            variant="filled"
            disabled={true}
            value={email}
          />
          <TextField
            required
            label="New Password"
            fullWidth
            className={classes.marginBottom}
            type="password"
            variant="filled"
            value={password}
            helperText={passwordErrMsg}
            error={passwordErr}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErr(false);
              setPasswordErrMsg("");
            }}
          />
          <TextField
            required
            label="Confirm New Password"
            fullWidth
            className={classes.marginBottom}
            type="password"
            variant="filled"
            value={confirmPassword}
            helperText={confirmPasswordErrMsg}
            error={confirmPasswordErr}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordErr(false);
              setConfirmPasswordErrMsg("");
            }}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendRounded />}
            color="primary"
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </AuthContainer>
  );
};

export default ResetPasswordScreen;
