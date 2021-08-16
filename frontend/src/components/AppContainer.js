import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      padding: `${theme.spacing(5)}px 0`,
      minHeight: "inherit",
    },
  };
});

const AppContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <SideDrawer />
      <Box className={classes.container}>{children}</Box>
    </Box>
  );
};

export default AppContainer;
