import { Typography, Box, makeStyles } from "@material-ui/core";
import React from "react";
import SideDrawer from "../components/SideDrawer";
import NotesCard from "../components/NotesCard";
import Masonry from "react-masonry-css";
import AppContainer from "../components/AppContainer";
const useStyles = makeStyles((theme) => {
  return {
    paddingY: {
      padding: `${theme.spacing(2)}px 0`,
    },
  };
});

const Dashboard = () => {
  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };

  //...

  return (
    <AppContainer>
      <>
        <Typography variant="h6" gutterBottom>
          My Notes
        </Typography>
        <Box className={classes.paddingY}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <NotesCard />
            <NotesCard />
            <NotesCard />
            <NotesCard />
            <NotesCard />
            <NotesCard />
            <NotesCard />
          </Masonry>
        </Box>
      </>
    </AppContainer>
  );
};

export default Dashboard;
