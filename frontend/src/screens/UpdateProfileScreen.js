import React, { useEffect, useState } from "react";
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
import ProgressBar from "../components/ProgressBar";
import AlertMessage from "../components/AlertMessage";

import { useDispatch, useSelector } from "react-redux";
import { clearUpdateUserProfile, updateProfile } from "../actions/userActions";

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

  //state hooks
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  //hooks for error's
  const [nameErr, setNameErr] = useState(false);
  const [bioErr, setBioErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  //hooks for error msg's
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [bioErrMsg, setBioErrMsg] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  //redux hooks
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const updateUserProfile = useSelector((state) => state.updateUserProfile);
  const { userInfo } = userLogin;
  const { loading, error, message } = updateUserProfile;

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setBio(userInfo.bio);
    setLocation(userInfo.location);

    if (message) {
      setPassword("");
      setTimeout(() => {
        dispatch(clearUpdateUserProfile());
      }, 5000);
    }
  }, [userInfo, message]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    //resetting errors
    setNameErr(false);
    setPasswordErr(false);
    setNameErrMsg("");
    setPasswordErrMsg("");
    //validating empty vals
    if (name === "" || name.length < 3) {
      setNameErr(true);
      setNameErrMsg("Invalid Full Name,length must be 3 or greater !!");
    }
    if (password === "" || password.length < 6) {
      setPasswordErr(true);
      setPasswordErrMsg("Invalid Password,length must be 6 or greater !!");
    }

    if (
      !(name === "" || name.length < 3) &&
      !(password === "" || password.length < 6)
    ) {
      dispatch(
        updateProfile(name.trim(), bio.trim(), location.trim(), password.trim())
      );
    }
  };

  return (
    <AppContainer>
      <Typography gutterBottom color="primary">
        Settings &gt; Update Profile
      </Typography>

      <Grid container className={classes.container}>
        <Grid item md={6} className={classes.formSection}>
          <Typography gutterBottom>Update Profile</Typography>
          {loading && <ProgressBar />}
          {error && <AlertMessage severity="error" text={error} />}
          {message && <AlertMessage severity="success" text={message} />}
          <form noValidate onSubmit={handleProfileUpdate}>
            <TextField
              type="text"
              variant="filled"
              label="Email Address"
              required
              fullWidth
              disabled
              className={classes.inputFeild}
              value={email}
            />
            <TextField
              type="text"
              variant="filled"
              label="Full Name"
              fullWidth
              required
              className={classes.inputFeild}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameErr(false);
                setNameErrMsg("");
              }}
              helperText={nameErrMsg}
              error={nameErr}
            />
            <TextField
              type="text"
              variant="filled"
              label="Your Bio"
              multiline
              rows={3}
              fullWidth
              className={classes.inputFeild}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setBioErr(false);
                setBioErrMsg("");
              }}
            />
            <TextField
              type="text"
              variant="filled"
              label="Location"
              fullWidth
              className={classes.inputFeild}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationErr(false);
                setLocationErrMsg("");
              }}
            />
            <TextField
              type="password"
              variant="filled"
              label="Password"
              required
              fullWidth
              className={classes.inputFeild}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr(false);
                setPasswordErrMsg("");
              }}
              helperText={passwordErrMsg}
              error={passwordErr}
            />

            <Button
              variant="contained"
              color="primary"
              endIcon={<SendRounded />}
              type="submit"
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
