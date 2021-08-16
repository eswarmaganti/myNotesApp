import React from "react";
import {
  Container,
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import Dashboard from "./screens/Dashboard";
import AddNotesScreen from "./screens/AddNotesScreen";
import EditNotesScreen from "./screens/EditNotesScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontWeightBold: 600,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
  },
  palette: {
    background: {
      default: "#EFF8FF",
    },
  },
});

const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      minHeight: "86.5vh",
    },
  };
});
const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Container className={classes.mainContainer}>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/signup" component={SignupScreen} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/notes/create" component={AddNotesScreen} />
            <Route
              path="/user/settings/updatePassword"
              component={UpdatePasswordScreen}
            />
            <Route
              path="/user/settings/updateProfile"
              component={UpdateProfileScreen}
            />
            <Route path="/notes/edit/:id" component={EditNotesScreen} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
