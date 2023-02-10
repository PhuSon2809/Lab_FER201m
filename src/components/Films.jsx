import React, { useContext } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import {
  Box,
  Card,
  Tooltip,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import ModalInformation from "./ModalInformation";
import { ThemeContext } from "./ThemeContext";

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

const BoxRow = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  color: "white",
});

function Films({ film }) {
  const { theme } = useContext(ThemeContext);
  const { toogleOpen, isOpen } = useModal();

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
                {/* <Link onClick={toogleOpen}> */}
                  <IconButton sx={{ color: "white" }}>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </BoxContent>
          </div>
        </CardBox>
        <TextTitle>{film.title}</TextTitle>
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
                {/* <Link onClick={toogleOpen}> */}
                  <IconButton sx={{ color: "white" }}>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </BoxContent>
          </div>
        </CardBox>
        <TextTitle>{film.title}</TextTitle>
        {isOpen && (
          <ModalInformation
            toogleOpen={toogleOpen}
            isOpen={isOpen}
            film={film}
          />
        )}
      </Box>
    </>
  );
}

export default Films;
