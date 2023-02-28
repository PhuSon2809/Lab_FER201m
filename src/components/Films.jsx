import React, { useContext, useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Box,
  Card,
  Tooltip,
  CardMedia,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import { ThemeContext } from "./ThemeContext";
import { deleteFilm, setEditFilm } from "../features/film/filmSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalAddFilm from "./ModalAddFilm";

const CardBox = styled(Card)({
  boxShadow:
    "3px 4px 2px -2px rgb(255 101 0 / 20%), 3px 2px 2px 3px rgb(255 101 0 / 14%), 3px 2px 4px 1px rgb(255 101 0 / 12%);",
});

const BoxContent = styled(Box)({
  width: "100%",
  height: "60px",
  padding: "7px 15px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  backgroundImage: "linear-gradient(to bottom,transparent,#ff5833,#ff5833)",
  position: "absolute",
  bottom: 0,
});

const BoxAction = styled(Box)({
  width: "100%",
  padding: "10px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
});

const BoxRow = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  color: "white",
});

function Films({ film }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.login);

  const { theme } = useContext(ThemeContext);
  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenAddFilm, isOpen: isOpenAddFilm } = useModal();

  const TextTitle = styled(Typography)({
    padding: "5px 10px",
    fontSize: "1.1rem",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "capitalize",
    color: theme.color,
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "#ff6500",
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
  }, [isLoading]);
  
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "85%",
          margin: "auto",
        }}
      >
        <CardBox>
          <div style={{ position: "relative" }}>
            <CardMedia
              sx={{ height: 390 }}
              image={film.image}
              title={film.title}
            />
            <BoxContent>
              <BoxRow>
                <Typography>{film.year}</Typography>
                <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
                <Typography>{film.nation}</Typography>
              </BoxRow>
              <Tooltip title="Detail" placement="top">
                <Link to={`detail/${film.id}`}>
                  <IconButton sx={{ color: "white" }}>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </BoxContent>
            {isLogin && (
              <BoxAction>
                <IconButton
                  sx={{
                    backgroundColor: "#ff5833",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#ff5833" },
                  }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem sx={{ p: 1 }}>
                    <Button
                      startIcon={<DeleteForeverIcon />}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleClose();
                        toogleOpen();
                      }}
                    >
                      Delete
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ p: 1 }}>
                    <Button
                      startIcon={<BorderColorIcon />}
                      variant="contained"
                      color="success"
                      onClick={handleClose}
                      fullWidth
                    >
                      Edit
                    </Button>
                  </MenuItem>
                </Menu>
              </BoxAction>
            )}
          </div>
        </CardBox>
        <TextTitle>{film.title}</TextTitle>
        {isOpen && (
          <Dialog
            sx={{
              ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                width: "300px",
                maxWidth: "300px",
              },
            }}
            open={isOpen}
            onClose={toogleOpen}
          >
            <DialogContent sx={{ width: "100%" }}>
              <Typography>Do you want to delete film?</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={toogleOpen}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => {
                  dispatch(deleteFilm(film.id));
                  toogleOpen();
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          width: "70%",
          margin: "auto",
        }}
      >
        <CardBox>
          <div style={{ position: "relative" }}>
            <CardMedia
              sx={{ height: 390 }}
              image={film.image}
              title={film.title}
            />
            <BoxContent>
              <BoxRow>
                <Typography>{film.year}</Typography>
                <FiberManualRecordIcon sx={{ fontSize: "10px" }} />
                <Typography>{film.nation}</Typography>
              </BoxRow>
              <Tooltip title="Detail" placement="top">
                <Link to={`detail/${film.id}`}>
                  <IconButton sx={{ color: "white" }}>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </BoxContent>
            {isLoading && (
              <BoxAction>
                <IconButton
                  sx={{
                    backgroundColor: "#ff5833",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#ff5833" },
                  }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem sx={{ p: 1 }}>
                    <Button
                      startIcon={<DeleteForeverIcon />}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleClose();
                        toogleOpen();
                      }}
                    >
                      Delete
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ p: 1 }} onClick={handleClose}>
                    <Button
                      startIcon={<BorderColorIcon />}
                      variant="contained"
                      color="success"
                      onClick={() => {
                        dispatch(setEditFilm(film));
                        toogleOpenAddFilm();
                      }}
                      fullWidth
                    >
                      Edit
                    </Button>
                  </MenuItem>
                </Menu>
                {isOpenAddFilm && (
                  <ModalAddFilm
                    toogleOpen={toogleOpenAddFilm}
                    isOpen={isOpenAddFilm}
                  />
                )}
              </BoxAction>
            )}
          </div>
        </CardBox>
        <TextTitle>{film.title}</TextTitle>
        {/* {isOpen && (
          <ModalInformation
            toogleOpen={toogleOpen}
            isOpen={isOpen}
            film={film}
          />
        )} */}
      </Box>
    </>
  );
}

export default Films;
