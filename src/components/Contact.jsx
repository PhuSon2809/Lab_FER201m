import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListOfNations } from "../shared/ListOfNation";

const SubmitButton = styled(Button)({
  width: "100%",
  padding: "5px 10px",
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "white",
  height: "fit-content",
  backgroundColor: "#ff5833",
  "&:hover": {
    backgroundColor: "#ff6500",
  },
});

const BoxImage = styled(Grid)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const TextTitle = styled(Typography)({
  padding: "5px 10px",
  width: "fit-content",
  marginBottom: "40px",
  fontSize: "2rem",
  fontWeight: "600",
  letterSpacing: "3px",
  textTransform: "capitalize",
  color: "white",
  background: "#ff6500",
  borderRadius: "5px",
  boxShadow: "2px 3px 2px 2px rgb(0 0 0 / 20%)",
});

function Contact() {
  const [nation, setNation] = useState("");

  const handleChange = (event) => {
    setNation(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      nation: 0,
      message: "",
    },
    onSubmit: (values) => {
      console.log(formik.values);
      alert(JSON.stringify(formik.values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required").email("Invalid email address."),
      phone: Yup.number()
        .integer()
        .required("Required")
        .typeError("Please enter a valid number."),
      nation: Yup.number().integer().typeError("Please select a program."),
      message: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more."),
    }),
  });

  return (
    <Container>
      <Grid container>
        <BoxImage item xs={12} sm={5} md={6}>
          <img
            src="./assets/images/contact.png"
            alt="contact"
            style={{ width: "100%" }}
          />
        </BoxImage>
        <Grid
          item
          xs={12}
          sm={7}
          md={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Card
            sx={{
              p: "20px",
              borderRadius: "10px",
              boxShadow: "2px 3px 3px 1px #ff6500",
            }}
          >
            <TextTitle>Contact us</TextTitle>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  fullWidth
                  name="name"
                  variant="outlined"
                  color="warning"
                  size="small"
                  label="Your Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <Typography
                    sx={{ ml: "5px", minHeight: "5px" }}
                    variant="caption"
                    color="red"
                  >
                    {formik.errors.name}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  name="phone"
                  label="Your Phone"
                  variant="outlined"
                  size="small"
                  color="warning"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && (
                  <Typography sx={{ ml: "5px" }} variant="caption" color="red">
                    {formik.errors.phone}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: "15px" }}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  color="warning"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <Typography sx={{ ml: "5px" }} variant="caption" color="red">
                    {formik.errors.email}
                  </Typography>
                )}
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: "15px" }}
                color="warning"
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Choose your favorite nation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="nation"
                  value={formik.values.nation}
                  onChange={formik.handleChange}
                  label="Choose your favorite nation"
                >
                  {ListOfNations.map((nation) => (
                    <MenuItem key={nation.id} value={nation.id}>
                      {nation.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.values.nation == 0 && (
                <Typography sx={{ ml: "5px" }} variant="caption" color="red">
                  {formik.errors.nation}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <EditIcon sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  label="Your Content"
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  color="warning"
                  minRows={3}
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
              </Box>
              {formik.errors.message && (
                <Typography sx={{ ml: "35px" }} variant="caption" color="red">
                  {formik.errors.message}
                </Typography>
              )}
              <SubmitButton sx={{ mt: 5 }} type="submit">
                Submit
              </SubmitButton>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
