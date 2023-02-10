import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ListOfFilms } from "../shared/ListOfFilms";
import Films from "./Films";

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

function PresentationFilm() {
  return (
    <Container>
      <Swiper
        slidesPerView={"auto"}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ height: "300px", borderRadius: "10px" }}
      >
        {ListOfFilms.map((film) => (
          <SwiperSlide key={film.id}>
            <img src={film.cover} alt="slide" className="img-fluid" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box sx={{ pt: 5 }}>
        <TextTitle>List Films</TextTitle>
        <Grid container rowSpacing={3} sx={{ pt: 2 }}>
          {ListOfFilms.map((film) => (
            <Grid key={film.id} item xs={12} sm={6}  md={3}>
              <Films film={film} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default PresentationFilm;
