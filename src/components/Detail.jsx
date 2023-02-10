import React, { useContext } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import { ListOfFilms } from "../shared/ListOfFilms";
import ModalCase from "./ModalCase";
import { ThemeContext } from "./ThemeContext";

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

function Detail() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { toogleOpen, isOpen } = useModal();

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

  const film = ListOfFilms.find((film) => {
    return film.id == id;
  });

  return (
    <Container>
      <Card sx={{m:"40px 0 50px 0", background: theme.backgroundColor }}>
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
            <VideoButton
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={toogleOpen}
            >
              Watch video
            </VideoButton>
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
            <VideoButton
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={toogleOpen}
            >
              Watch video
            </VideoButton>
          </Box>
        </CardContent>
        {isOpen && (
          <ModalCase toogleOpen={toogleOpen} isOpen={isOpen} film={film} />
        )}
      </Card>
    </Container>
  );
}

export default Detail;
