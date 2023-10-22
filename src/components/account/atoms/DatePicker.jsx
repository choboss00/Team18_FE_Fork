import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5A906E",
      backgroundColor: "#F2F7F5",
    },
    secondary: {
      main: "#F9BC60",
    },
  },
});

const maxDate = dayjs("2023-10-22");

const BasicDatePicker = ({ value, onChange, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="YYYY-MM-DD"
          value={value}
          onChange={onChange}
          label="Birth"
          maxDate={maxDate}
          sx={{
            marginBottom: 2,
          }}
          {...props}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default BasicDatePicker;
