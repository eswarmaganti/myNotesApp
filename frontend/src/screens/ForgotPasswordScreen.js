import { makeStyles, Box, TextField, Button } from "@material-ui/core";
import React from "react";
import AuthContainer from "../components/AuthContainer";
import { SendRounded } from "@material-ui/icons";
import resetpassImg from "../assets/resetpass.svg";

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

  const handleVerificationCode = (e) => {
    e.preventDefault();
  };

  return (
    <AuthContainer
      title="Forgot Password"
      subTitle="if you forgot your password? no worries, please go with the procedure below"
      image={resetpassImg}
    >
      <Box>
        <form noValidate onSubmit={handleVerificationCode}>
          <TextField
            required
            label="Email Address"
            fullWidth
            className={classes.marginBottom}
            type="text"
            variant="filled"
          />
          <TextField
            required
            label="Verification Code"
            fullWidth
            className={classes.marginBottom}
            type="text"
            variant="filled"
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
