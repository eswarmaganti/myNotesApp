import { Grid, makeStyles, Typography, Box, Button } from "@material-ui/core";
import { PersonAddRounded } from "@material-ui/icons";
import React from "react";
import heroImg from "../assets/hero.svg";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      minHeight: "inherit",
    },
    heroContainer: {
      paddingRight: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    heroImageSection: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 20,
    },
    heroImage: {
      width: "100%",
      height: "70%",
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
  };
});

const HomeScreen = ({ history }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item sm={12} md={6} className={classes.heroContainer}>
        <Box>
          <Typography variant="h3" gutterBottom color="textPrimary">
            Digital place to manage your notes any time and anywhere.
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus tempora laborum quo accusantium odio provident autem
            aut rerum, vitae maiores eveniet,
          </Typography>
          <Button
            className={classes.marginTop}
            color="primary"
            variant="contained"
            endIcon={<PersonAddRounded />}
            onClick={() => history.push("/signup")}
          >
            Create a New Account
          </Button>
        </Box>
      </Grid>
      <Grid item sm={12} md={6} className={classes.heroImageSection}>
        <img src={heroImg} alt="image" className={classes.heroImage} />
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
