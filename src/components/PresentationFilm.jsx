import React, { useContext, useEffect, useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExploreIcon from "@mui/icons-material/Explore";
import SortIcon from "@mui/icons-material/Sort";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Pagination as PaginationSwiper } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllFilms, setAddFilm } from "../features/film/filmSlice";
import { useModal } from "../hooks/useModal";
import { ListOfNations } from "../shared/ListOfNation";
import Films from "./Films";
import ModalAddFilm from "./ModalAddFilm";
import { FormInput, IconWrapper, InputWrapper } from "./Style";
import { ThemeContext } from "./ThemeContext";

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

const BoxFilter = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  margin: "40px 0 40px 0",
  padding: "10px",
  background: "#fff",
  borderRadius: "5px",
  boxShadow:
    "3px 4px 2px -2px rgb(255 101 0 / 20%), 3px 2px 2px 3px rgb(255 101 0 / 14%), 3px 2px 2px 1px rgb(255 101 0 / 12%);",
});

function PresentationFilm() {
  const { theme } = useContext(ThemeContext);

  const TextFilter = styled(Typography)({
    padding: "5px 10px",
    fontSize: "1.1rem",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "capitalize",
    color: theme.color,
    textDecoration: "underline",
    textDecorationColor: "#ff6500",
  });

  const dispatch = useDispatch();
  const { toogleOpen, isOpen } = useModal();
  const { isLoading, films, count, resultPerPage } = useSelector(
    (state) => state.film
  );
  const { isLoading: loadingLogin } = useSelector((state) => state.login);

  const [isLogin, setIsLogin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nation, setNation] = useState("");
  const [select, setSelect] = useState("");

  const setCurrentPageNo = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const arrSort = select.split("/");
    console.log(arrSort);
    const params = {
      page: currentPage,
      nation,
      sortBy: arrSort[0],
      typeSort: arrSort[1],
    };
    dispatch(getAllFilms(params));
  }, [currentPage, nation, select]);

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
  }, [loadingLogin]);

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
            modules={[PaginationSwiper]}
            className="mySwiper"
            style={{ height: "300px", borderRadius: "10px" }}
          >
            {films.map((film) => (
              <SwiperSlide key={film.id}>
                <img src={film.cover} alt="slide" className="img-fluid" />
              </SwiperSlide>
            ))}
          </Swiper>

          <Box sx={{ pt: 8 }}>
            <BoxTitle>
              <TextTitle>List Films</TextTitle>
              {isLogin && (
                <ModalButton
                  startIcon={<ControlPointIcon />}
                  onClick={() => {
                    toogleOpen();
                    dispatch(setAddFilm());
                  }}
                >
                  Add new film
                </ModalButton>
              )}
              {isOpen && (
                <ModalAddFilm toogleOpen={toogleOpen} isOpen={isOpen} />
              )}
            </BoxTitle>

            <BoxFilter>
              <FormInput sx={{ width: "25%" }}>
                <TextFilter>Nation</TextFilter>
                <InputWrapper>
                  <IconWrapper>
                    <ExploreIcon />
                  </IconWrapper>
                  <select
                    value={nation}
                    onChange={(e) => setNation(e.target.value)}
                  >
                    <option value="">All nations</option>
                    {ListOfNations?.map((nation) => {
                      return (
                        <option key={nation.id} value={nation.name}>
                          {nation.name}
                        </option>
                      );
                    })}
                  </select>
                </InputWrapper>
              </FormInput>

              <FormInput sx={{ width: "25%" }}>
                <TextFilter>Sort</TextFilter>
                <InputWrapper>
                  <IconWrapper>
                    <SortIcon />
                  </IconWrapper>
                  <select
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option value="">Options sort</option>
                    <option value="title/asc">Name A - Z</option>
                    <option value="title/desc">Name Z - A</option>
                    <option value="year/asc">Ascending year</option>
                    <option value="year/desc">Descending year</option>
                  </select>
                </InputWrapper>
              </FormInput>
            </BoxFilter>

            <Grid container rowSpacing={3} sx={{ pt: 2 }}>
              {films.map((film) => (
                <Grid key={film.id} item xs={12} sm={6} md={3}>
                  <Films film={film} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mt: 5,
                mb: 4,
              }}
            >
              <Stack spacing={2} sx={{ mr: "auto", ml: "auto" }}>
                <Pagination
                  count={Math.ceil(
                    nation
                      ? films.length / resultPerPage
                      : count / resultPerPage
                  )}
                  page={currentPage}
                  onChange={setCurrentPageNo}
                  variant="outlined"
                  color="error"
                />
              </Stack>
            </Box>
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
