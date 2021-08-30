import React from "react";
import {
  Box,
  TextField,
  makeStyles,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
} from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    radioGroup: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    radio: {
      marginLeft: theme.spacing(1),
    },
    inputFeild: {
      marginBottom: theme.spacing(2),
      display: "block",
    },
    form: {
      padding: `${theme.spacing(2)}px 0`,
    },
  };
});

const NotesForm = ({
  handler,
  title,
  description,
  categoury,
  setTitle,
  setDescription,
  setCategoury,
  titleErr,
  descriptionErr,
  descriptionErrMsg,
  titleErrMsg,
  setTitleErr,
  setDescriptionErr,
  setDescriptionErrMsg,
  setTitleErrMsg,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.form}>
      <form noValidate onSubmit={handler}>
        <TextField
          type="text"
          variant="filled"
          required
          fullWidth
          label="Notes Title"
          className={classes.inputFeild}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleErr(false);
            setTitleErrMsg("");
          }}
          error={titleErr}
          helperText={titleErrMsg}
          disabled={loading}
        />
        <TextField
          type="text"
          variant="filled"
          required
          fullWidth
          label="Notes Descrition"
          multiline
          rows={10}
          className={classes.inputFeild}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionErr(false);
            setDescriptionErrMsg("");
          }}
          error={descriptionErr}
          helperText={descriptionErrMsg}
          disabled={loading}
        />
        <FormControl component="fieldset" className={classes.inputFeild}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            value={categoury}
            onChange={(e) => {
              setCategoury(e.target.value);
            }}
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="todos"
              control={<Radio color="primary" disabled={loading} />}
              label="Todos"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="primary" disabled={loading} />}
              label="Work"
              className={classes.radio}
            />
            <FormControlLabel
              value="remainders"
              control={<Radio color="primary" disabled={loading} />}
              label="Remainders"
              className={classes.radio}
            />
            <FormControlLabel
              value="money"
              control={<Radio color="primary" disabled={loading} />}
              label="Money"
              className={classes.radio}
            />
            <FormControlLabel
              value="Others"
              control={<Radio color="primary" disabled={loading} />}
              label="Others"
              className={classes.radio}
            />
          </RadioGroup>
        </FormControl>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          endIcon={<SendRounded />}
          disabled={loading}
        >
          Save Notes
        </Button>
      </form>
    </Box>
  );
};

export default NotesForm;
