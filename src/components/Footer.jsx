import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AdbOutlinedIcon from "@mui/icons-material/AdbOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AirplayIcon from "@mui/icons-material/Airplay";
import AppleIcon from "@mui/icons-material/Apple";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { ThemeContext } from "./ThemeContext";

const GridContent = styled(Grid)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

const BoxContact = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  color: "white",
});

function Footer() {
  const { theme } = useContext(ThemeContext);

  const FooterBox = styled(Box)({
    backgroundColor: theme.backgroundColor,
    width: "100%",
    height: "fit-content",
    boxShadow:
      "0px 1px 4px 3px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 4px 10px 0px rgb(0 0 0 / 12%)",
  });

  return (
    <FooterBox>
      <Container>
        <Grid container spacing={2} sx={{ pt: 1, pb: 2 }}>
          <GridContent item xs={12} sm={6} md={4} sx={{ color: "#ff6500" }}>
            <MovieFilterOutlinedIcon
              sx={{
                fontSize: "3rem",
                ml: 4,
              }}
            />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontSize: "3rem",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FILMS
            </Typography>
          </GridContent>
          <Grid item xs={6} sm={6} md={3}>
            <Typography sx={{ color: theme.color }}>
              Contact with me:
            </Typography>
            <BoxContact>
              <IconButton sx={{ color: theme.icon }}>
                <CallOutlinedIcon />
              </IconButton>
              <Typography sx={{ color: theme.color }}>091436076</Typography>
            </BoxContact>
            <BoxContact>
              <IconButton sx={{ color: theme.icon }}>
                <LocalPostOfficeOutlinedIcon />
              </IconButton>
              <Typography sx={{ color: theme.color }}>
                films@fpt.com.vn
              </Typography>
            </BoxContact>
          </Grid>
          <Grid item xs={6} sm={12} md={5}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <Box sx={{ pl: 1 }}>
                  <Typography sx={{ color: theme.color }}>
                    Follow me on:
                  </Typography>
                  <Box>
                    <IconButton sx={{ color: theme.icon }}>
                      <FacebookOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: theme.icon }}>
                      <VideocamOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <GridContent item xs={12} sm={8} md={8}>
                <Box sx={{ m: "auto", border: "1px solid #ff6500" }}>
                  <IconButton sx={{ color: theme.icon }}>
                    <LanguageOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.icon }}>
                    <AdbOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.icon }}>
                    <AppleIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.icon }}>
                    <CloudUploadIcon />
                  </IconButton>
                  <IconButton sx={{ color: theme.icon }}>
                    <AirplayIcon />
                  </IconButton>
                </Box>
              </GridContent>
            </Grid>
            <Grid container sx={{ mt: 2, ml: 1 }}>
              <Typography
                sx={{
                  display: { xs: "none",sm: "flex", md: "flex" },
                  color: theme.color,
                  m: "auto",
                }}
              >
                Full entertainment experience on FILMS
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FooterBox>
  );
}

export default Footer;
