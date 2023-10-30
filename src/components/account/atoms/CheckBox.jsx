import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9BC60",
    },
  },
});

const CheckBoxes = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <label>
        <Checkbox
          type={props.type}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
          inputProps={props.inputProps}
        />
        {children}
      </label>
    </ThemeProvider>
  );
};

export default CheckBoxes;
