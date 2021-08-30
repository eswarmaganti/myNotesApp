import { makeStyles, Box, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AuthContainer from "../components/AuthContainer";
import { SendRounded } from "@material-ui/icons";
import resetpassImg from "../assets/resetpass.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getVerificationCode,
  validateVerificationCode,
} from "../actions/userActions";
import AlertMessage from "../components/AlertMessage";
import ProgressBar from "../components/ProgressBar";
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

const ForgotPasswordScreen = ({ history }) => {
  const classes = useStyles();

  //state hooks
  const [email, setEmail] = useState("");
  const [vc, setVC] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [vcErr, setVCErr] = useState(false);

  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [vcErrMsg, setVCErrMsg] = useState("");

  //redux hooks
  const dispatch = useDispatch();
  const verificationCode = useSelector((state) => state.verificationCode);
  const { vcSent, error, vcVerified, message, loading, vcEmail } =
    verificationCode;

  const handleVerificationCode = (e) => {
    e.preventDefault();

    if (!vcSent && (email === "" || email.length < 6)) {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email Address,length should be 6 or high");
    }
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!vcSent && email.length > 6 && !pattern.test(email)) {
      setEmailErr(true);
      setEmailErrMsg("Email Address format is invalid!!");
    }
    if (vcSent && (vc === "" || vc.length !== 6)) {
      setVCErr(false);
      setVCErrMsg("Invalid Verification Code,length should be equal to 6");
    }

    //request for generating verification code
    if (
      !vcSent &&
      !(email === "" || email.length < 6) &&
      !(email.length > 6 && !pattern.test(email))
    ) {
      // if verification code not sent then send the generate verification code request
      dispatch(getVerificationCode(email.trim()));
    }
    //request for validation the verification code
    if (vcSent && !(vc === "" || vc.length !== 6)) {
      // verification code sent then submit the verification request
      dispatch(validateVerificationCode(email.trim(), vc.trim()));
    }
  };

  useEffect(() => {
    if (vcVerified) {
      setVC("");
      setTimeout(() => {
        history.push(`/resetPassword/${vcEmail}`);
      }, 2000);
    }
  }, [vcVerified]);

  return (
    <AuthContainer
      title="Forgot Password"
      subTitle="if you forgot your password? no worries, please go with the procedure below"
      image={resetpassImg}
    >
      <Box>
        {loading && <ProgressBar />}
        {message && <AlertMessage severity="success" text={message} />}
        {error && <AlertMessage severity="error" text={error} />}
        <form noValidate onSubmit={handleVerificationCode}>
          <TextField
            required
            label="Email Address"
            fullWidth
            className={classes.marginBottom}
            type="text"
            variant="filled"
            error={emailErr}
            helperText={emailErrMsg}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
              setEmailErrMsg("");
            }}
            disabled={vcSent}
          />
          <TextField
            required
            label="Verification Code"
            fullWidth
            className={classes.marginBottom}
            type="text"
            variant="filled"
            error={vcErr}
            helperText={vcErrMsg}
            value={vc}
            onChange={(e) => {
              setVC(e.target.value);
              setVCErr(false);
              setVCErrMsg("");
            }}
            disabled={!vcSent}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendRounded />}
            color="primary"
          >
            Get Verification Code
          </Button>
        </form>
      </Box>
    </AuthContainer>
  );
};

export default ForgotPasswordScreen;
