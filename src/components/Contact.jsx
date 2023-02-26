import React, { useContext, useEffect, useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useModal } from "../hooks/useModal";
import ModalContact from "./ModalContact";
import { ThemeContext } from "./ThemeContext";
import {
  deleteUser,
  getAllUsers,
  setAddUser,
  setEditUser,
} from "../features/user/userSlice";

const ModalButton = styled(Button)({
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "white",
  height: "fit-content",
  backgroundColor: "#ff5833",
  "&:hover": {
    backgroundColor: "#ff6500",
  },
});

const BoxTitle = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const BoxLoading = styled(Box)({
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const TableCellHeader = styled(TableCell)({
  color: "#fff",
  fontWeight: "bold",
});

function Contact() {
  const { theme } = useContext(ThemeContext);

  const TextTitle = styled(Typography)({
    fontSize: "2rem",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "capitalize",
    color: theme.color,
    textDecoration: "underline",
    textDecorationColor: "#ff6500",
    marginBottom: "10px",
  });

  const dispatch = useDispatch();
  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleModalDelete, isOpen: isOpenModalDelete } =
    useModal();
  const { isLoading, users } = useSelector((state) => state.user);
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Container>
      <BoxTitle>
        <TextTitle>List Contact</TextTitle>
        <ModalButton
          startIcon={<ControlPointIcon />}
          onClick={() => {
            toogleOpen();
            dispatch(setAddUser());
          }}
        >
          Add new contact
        </ModalButton>
        {isOpen && <ModalContact toogleOpen={toogleOpen} isOpen={isOpen} />}
      </BoxTitle>

      {isLoading ? (
        <BoxLoading>
          <CircularProgress color="warning" />
        </BoxLoading>
      ) : (
        <TableContainer sx={{ mt: "20px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#ff6500", color: "#fff" }}>
              <TableRow>
                <TableCellHeader sx={{ width: "5%" }}>No</TableCellHeader>
                <TableCellHeader width="15.7%">Name</TableCellHeader>
                <TableCellHeader width="15.7%">Phone</TableCellHeader>
                <TableCellHeader width="15.7%">Email</TableCellHeader>
                <TableCellHeader width="15.7%">Nation favorite</TableCellHeader>
                <TableCellHeader width="15.7%">Content</TableCellHeader>
                <TableCellHeader width="15.7%">Action</TableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ width: "5%" }}>{(index += 1)}</TableCell>
                  <TableCell width="15.7%">{user.name}</TableCell>
                  <TableCell width="15.7%">{user.phone}</TableCell>
                  <TableCell width="15.7%">{user.email}</TableCell>
                  <TableCell width="15.7%">{user.nation}</TableCell>
                  <TableCell width="15.7%">{user.message}</TableCell>
                  <TableCell width="15.7%">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setUser(user);
                        toogleModalDelete();
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => {
                        dispatch(setEditUser(user));
                        toogleOpen();
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isOpenModalDelete && (
        <Dialog
          sx={{
            ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
              width: "300px",
              maxWidth: "300px",
              background: theme.backgroundColor,
            },
          }}
          open={isOpenModalDelete}
          onClose={toogleModalDelete}
        >
          <DialogContent sx={{ width: "100%" }}>
            <Typography>Do you want to delete user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={toogleModalDelete}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                dispatch(deleteUser(user.id));
                toogleModalDelete();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
    </Container>
  );
}

export default Contact;
