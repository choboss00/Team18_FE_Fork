import React from "react";
import { TextField, createTheme, ThemeProvider, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    //green
    primary: {
      main: "#5A906E",
      backgroundColor: "#F2F7F5",
    },
    //orange
    secondary: {
      main: "#F9BC60",
    },
  },
});

const InputBox = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant={props.variant}
        id={props.id}
        key={props.id}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        color="secondary"
        sx={{
          width: "100%",
          marginTop: 3,
          marginBottom: 2,
          ...(props.variant === "filled" && {
            "& .MuiFilledInput-root": {
              backgroundColor: `rgb(4, 180, 4, 0.02)`, //green, opacity 부여
              "&.Mui-focused": {
                backgroundColor: theme.palette.primary.backgroundColor,
              },
            },
          }),
          ...(props.variant === "outlined" && {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: (theme) => `solid 2px ${theme.palette.primary.main}`,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.secondary.main,
              },
            },
          }),
        }}
        error={props.error}
        helperText={props.error ? props.msg : ""}
      />
    </ThemeProvider>
  );
};

export default InputBox;
