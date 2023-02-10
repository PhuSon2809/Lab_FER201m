import React, { useContext } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";

const CloseButton = styled(Button)({
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

function ModalInformation({ toogleOpen, isOpen, film }) {
  const { theme } = useContext(ThemeContext);

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

  return (
    <Dialog
      sx={{
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: "800px",
          maxWidth: "800px",
          background: theme.backgroundColor,
        },
      }}
      open={isOpen}
      onClose={toogleOpen}
    >
      <DialogContent sx={{ width: "100%" }}>
        <Grid container>
          <Grid item md={5} sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={film.image}
              alt={film.title}
              style={{
                width: "100%",
                boxShadow: "2px 3px 2px 2px rgb(225 101 0 / 20%)",
              }}
            />
          </Grid>
          <Grid item md={7} sx={{ p: "0 20px" }}>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pt: 0 }}>
        <CloseButton onClick={toogleOpen}>Close</CloseButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalInformation;
