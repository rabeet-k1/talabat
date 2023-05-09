import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({
  snackbarProps,
  handleCloseSnackbar,
}) => {
  return (
    <Snackbar
      open={snackbarProps.open}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbarProps.type}
        sx={{ width: "100%" }}
      >
        {snackbarProps.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
