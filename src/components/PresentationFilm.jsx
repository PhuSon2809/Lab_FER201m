import React, { useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllFilms, setAddFilm } from "../features/film/filmSlice";
import Films from "./Films";
import { useModal } from "../hooks/useModal";
import ModalAddFilm from "./ModalAddFilm";
import { ToastContainer } from "react-toastify";

const TextTitle = styled(Typography)({
  padding: "5px 10px",
  width: "fit-content",
  fontSize: "2rem",
  fontWeight: "600",
  letterSpacing: "3px",
  textTransform: "capitalize",
  color: "white",
  background: "#ff6500",
  borderRadius: "5px",
  boxShadow: "2px 3px 2px 2px rgb(0 0 0 / 20%)",
});

const BoxTitle = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const BoxLoading = styled(Box)({
  width: "100%",
  height: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

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

function PresentationFilm() {
  const dispatch = useDispatch();
  const { toogleOpen, isOpen } = useModal();
  const { isLoading, films } = useSelector((state) => state.film);

  useEffect(() => {
    dispatch(getAllFilms());
  }, []);

  return (
    <Container>
      {isLoading ? (
        <BoxLoading>
          <CircularProgress color="warning" />
        </BoxLoading>
      ) : (
        <>
          <Swiper
            slidesPerView={"auto"}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            style={{ height: "300px", borderRadius: "10px" }}
          >
            {films.map((film) => (
              <SwiperSlide key={film.id}>
                <img src={film.cover} alt="slide" className="img-fluid" />
              </SwiperSlide>
            ))}
          </Swiper>

          <Box sx={{ pt: 5 }}>
            <BoxTitle>
              <TextTitle>List Films</TextTitle>
              <ModalButton
                startIcon={<ControlPointIcon />}
                onClick={() => {
                  toogleOpen();
                  dispatch(setAddFilm());
                }}
              >
                Add new film
              </ModalButton>
              {isOpen && (
                <ModalAddFilm toogleOpen={toogleOpen} isOpen={isOpen} />
              )}
            </BoxTitle>
            <Grid container rowSpacing={3} sx={{ pt: 2 }}>
              {films.map((film) => (
                <Grid key={film.id} item xs={12} sm={6} md={3}>
                  <Films film={film} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
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

export default PresentationFilm;
