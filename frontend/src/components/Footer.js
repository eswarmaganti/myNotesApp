import React from "react";
import { Typography, Box } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
const Footer = () => {
  return (
    <Box style={{ backgroundColor: grey[400], padding: `8px 0` }}>
      <Typography style={{ fontSize: 14 }} align="center">
        &copy; My NotesApp, A Full-Stack MERN Notes Taking App Project.&nbsp;
        Designed and Developed by ESWAR KRISHNA MAGANTI
      </Typography>
    </Box>
  );
};

export default Footer;
