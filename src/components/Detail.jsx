import React, { useContext, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFilm, getFilm, setEditFilm } from "../features/film/filmSlice";
import { useModal } from "../hooks/useModal";
import ModalCase from "./ModalCase";
import { ThemeContext } from "./ThemeContext";
import ModalAddFilm from "./ModalAddFilm";
import { ToastContainer } from "react-toastify";

const VideoButton = styled(Button)({
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

const TitleContent = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#ff6500",
});

const BoxLoading = styled(Box)({
  width: "100%",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BoxTitle = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "10px",
});

function Detail() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, film } = useSelector((state) => state.film);
  const { isLoading: loadingLogin } = useSelector((state) => state.login);

  const { toogleOpen, isOpen } = useModal();
  const { toogleOpen: toogleOpenAddFilm, isOpen: isOpenAddFilm } = useModal();
  const { toogleOpen: toogleOpenDeleteFilm, isOpen: isOpenDeleteFilm } =
    useModal();

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
  }, [loadingLogin]);

  const TextTitle = styled(Typography)({
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "capitalize",
    color: theme.color,
    textDecoration: "underline",
    textDecorationColor: "#ff6500",
    marginBottom: "10px",
  });

  const Text = styled(Typography)({
    height: "2.2rem",
    color: theme.color,
  });

  const TextBold = styled(Typography)({
    display: "inline-block",
    fontWeight: "bold",
    color: theme.color,
  });

  const TextContent = styled(Typography)({
    textAlign: "justify",
    color: theme.color,
  });

  useEffect(() => {
    dispatch(getFilm(id));
  }, []);

  return (
    <Container>
      {isLoading ? (
        <BoxLoading>
          <CircularProgress color="warning" />
        </BoxLoading>
      ) : (
        <Card sx={{ m: "40px 0 50px 0", background: theme.backgroundColor }}>
          <div style={{ positions: "relative" }}>
            <CardMedia
              sx={{ height: 500 }}
              image={film.cover}
              title={film.title}
            />
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                left: "230px",
                bottom: "-70px",
              }}
            >
              <img
                src={film.image}
                alt={film.title}
                style={{
                  width: " 230px",
                  boxShadow: "2px 3px 2px 2px rgb(225 101 0 / 20%)",
                }}
              />
              <Box sx={{ textAlign: "center" }} color="#ff6500">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </Box>
            </Box>
          </div>
          <CardContent sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ pl: "300px", pr: "25px" }}>
              <TextTitle variant="h4">{film.title}</TextTitle>
              <Text>
                Release Year: <TextBold>{film.year}</TextBold>
              </Text>
              <Text>
                Nation: <TextBold>{film.nation}</TextBold>
              </Text>
              <Box sx={{ p: "5px 10px", border: "1px solid #ff6500" }}>
                <TitleContent>Movie content:</TitleContent>
                <TextContent>{film.content}</TextContent>
              </Box>
              <BoxTitle>
                <VideoButton
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={toogleOpen}
                >
                  Watch video
                </VideoButton>
                {isLogin && (
                  <Box>
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
                            toogleOpenDeleteFilm();
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
                    {isOpenDeleteFilm && (
                      <Dialog
                        sx={{
                          ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                            width: "300px",
                            maxWidth: "300px",
                          },
                        }}
                        open={isOpenDeleteFilm}
                        onClose={toogleOpenDeleteFilm}
                      >
                        <DialogContent sx={{ width: "100%" }}>
                          <Typography>Do you want to delete film?</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={toogleOpenDeleteFilm}
                          >
                            Close
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              dispatch(deleteFilm(film.id));
                              toogleOpenDeleteFilm();
                              if (!isLoading) {
                                navigate("/");
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
                    {isOpenAddFilm && (
                      <ModalAddFilm
                        toogleOpen={toogleOpenAddFilm}
                        isOpen={isOpenAddFilm}
                      />
                    )}
                  </Box>
                )}
              </BoxTitle>
            </Box>
          </CardContent>
          <CardContent sx={{ display: { xs: "block", md: "none" } }}>
            <Box>
              <TextTitle variant="h4">{film.title}</TextTitle>
              <Text>
                Release Year: <TextBold>{film.year}</TextBold>
              </Text>
              <Text>
                Nation: <TextBold>{film.nation}</TextBold>
              </Text>
              <Box sx={{ p: "5px 10px", border: "1px solid #ff6500" }}>
                <TitleContent>Movie content:</TitleContent>
                <TextContent>{film.content}</TextContent>
              </Box>
              <BoxTitle>
                <VideoButton
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={toogleOpen}
                >
                  Watch video
                </VideoButton>
                {isLogin && (
                  <>
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
                            toogleOpenDeleteFilm();
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
                    {isOpenDeleteFilm && (
                      <Dialog
                        sx={{
                          ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                            width: "300px",
                            maxWidth: "300px",
                          },
                        }}
                        open={isOpenDeleteFilm}
                        onClose={toogleOpenDeleteFilm}
                      >
                        <DialogContent sx={{ width: "100%" }}>
                          <Typography>Do you want to delete film?</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={toogleOpenDeleteFilm}
                          >
                            Close
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              dispatch(deleteFilm(film.id));
                              toogleOpenDeleteFilm();
                              if (!isLoading) {
                                navigate("/");
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
                    {isOpenAddFilm && (
                      <ModalAddFilm
                        toogleOpen={toogleOpenAddFilm}
                        isOpen={isOpenAddFilm}
                      />
                    )}
                  </>
                )}
              </BoxTitle>
            </Box>
          </CardContent>
          {isOpen && (
            <ModalCase toogleOpen={toogleOpen} isOpen={isOpen} film={film} />
          )}
        </Card>
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

export default Detail;
