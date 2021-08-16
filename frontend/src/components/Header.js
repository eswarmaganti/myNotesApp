import React from "react";
import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  Container,
  SvgIcon,
} from "@material-ui/core";
import {
  HomeRounded,
  Notes,
  PersonRounded,
  PersonAddRounded,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    brand: {
      flexGrow: 1,
      display: "flex",
    },
    link: {
      margin: `0 ${theme.spacing(1)}px`,
    },
    icon: {
      height: "inherit",
      marginRight: 5,
    },
    brandText: {
      fontWeight: "bold",
    },
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  };
});

const Header = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      // color="transparent"
      elevation={0}
      className={classes.appbar}
    >
      <Toolbar>
        <Box className={classes.brand}>
          <SvgIcon className={classes.icon}>
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M19,3h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5 C21,3.9,20.1,3,19,3z M12,2.75c0.41,0,0.75,0.34,0.75,0.75S12.41,4.25,12,4.25s-0.75-0.34-0.75-0.75S11.59,2.75,12,2.75z M8.9,17 H7.5C7.22,17,7,16.78,7,16.5v-1.43c0-0.13,0.05-0.26,0.15-0.35l5.81-5.81l2.12,2.12l-5.83,5.83C9.16,16.95,9.03,17,8.9,17z M16.85,9.27l-1.06,1.06l-2.12-2.12l1.06-1.06c0.2-0.2,0.51-0.2,0.71,0l1.41,1.41C17.05,8.76,17.05,9.07,16.85,9.27z" />
            </g>
          </SvgIcon>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.brandText}
          >
            My NotesApp
          </Typography>
        </Box>
        <Box>
          <Button
            color="inherit"
            className={classes.link}
            endIcon={<HomeRounded />}
            onClick={() => history.push("/")}
          >
            home
          </Button>
          <Button
            color="inherit"
            className={classes.link}
            endIcon={<PersonRounded />}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Button
            color="inherit"
            className={classes.link}
            endIcon={<PersonAddRounded />}
            onClick={() => history.push("/signup")}
          >
            signup
          </Button>
          <Button
            color="inherit"
            className={classes.link}
            onClick={() => history.push("/dashboard")}
          >
            Eswar Maganti
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
