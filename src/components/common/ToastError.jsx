import React from "react";
import Toast from "./Toast";

export default function ToastError({ errorMessage }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Toast
      open={open}
      autoHideDuration={10000}
      message={errorMessage}
      severity="error"
      sx={{ backgroundColor: "#F9NC60" }}
    />
  );
}
