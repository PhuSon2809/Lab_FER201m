import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListOfNations } from "../shared/ListOfNation";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../features/user/userSlice";

const CloseButton = styled(Button)({
  marginTop: "10px",
  textTransform: "capitalize",
  fontWeight: "bold",
  height: "fit-content",
});

const SubmitButton = styled(Button)({
  marginTop: "10px",
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "white",
  height: "fit-content",
  backgroundColor: "#ff5833",
  "&:hover": {
    backgroundColor: "#ff6500",
  },
});

const TextTitle = styled(DialogTitle)({
  fontSize: "2rem",
  fontWeight: "600",
  letterSpacing: "2px",
  textTransform: "capitalize",
  color: "#000",
  textDecoration: "underline",
  textDecorationColor: "#ff6500",
});

function ModalContact({ isOpen, toogleOpen }) {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { isEditing, user } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      name: isEditing ? user.name : "",
      email: isEditing ? user.email : "",
      phone: isEditing ? user.phone : "",
      nation: isEditing ? user.nation : "",
      message: isEditing ? user.message : "",
    },
    onSubmit: (values, formikHelpers) => {
      if (isEditing) {
        const userUpdate = {
          userId: user.id,
          data: formik.values,
        };
        dispatch(updateUser(userUpdate));
      } else {
        dispatch(createUser(formik.values));
      }
      formikHelpers.resetForm();
      toogleOpen();
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
      nation: Yup.string().typeError("Please select a program."),
      message: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more."),
    }),
  });



  return (
    <Dialog
      sx={{
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: "550px",
          maxWidth: "550px",
        },
      }}
      open={isOpen}
      onClose={toogleOpen}
    >
      <TextTitle>{isEditing ? "Update user" : "Add new user"}</TextTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ width: "100%" }}>
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
                <MenuItem key={nation.id} value={nation.name}>
                  {nation.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.values.nation === 0 && (
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
        </DialogContent>
        <DialogActions>
          <CloseButton variant="contained" onClick={toogleOpen}>
            Close
          </CloseButton>
          <SubmitButton type="submit">
            {isEditing ? "Update" : "Add"}
          </SubmitButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalContact;
