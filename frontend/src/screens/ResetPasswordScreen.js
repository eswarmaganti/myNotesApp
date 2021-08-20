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
const ResetPasswordScreen = () => {
  const classes = useStyles();

  const handleResetPassword = (e) => {
    e.preventDefault();
  };

  return (
    <AuthContainer
      title="Reset Your Password"
      subTitle="please reset your password by creating a new password!!"
      image={resetpassImg}
    >
      <Box>
        <form noValidate onSubmit={handleResetPassword}>
          <TextField
            required
            label="Email Address"
            fullWidth
            className={classes.marginBottom}
            type="email"
            variant="filled"
            disabled={true}
          />
          <TextField
            required
            label="New Password"
            fullWidth
            className={classes.marginBottom}
            type="password"
            variant="filled"
          />
          <TextField
            required
            label="Confirm New Password"
            fullWidth
            className={classes.marginBottom}
            type="password"
            variant="filled"
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
