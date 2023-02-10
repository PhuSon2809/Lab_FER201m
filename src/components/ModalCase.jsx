import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";

const CloseButton = styled(Button)({
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

function ModalCase({ isOpen, toogleOpen, film }) {
  const { theme } = useContext(ThemeContext);

  const TextTitle = styled(DialogTitle)({
    fontSize: "2rem",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "capitalize",
    color: theme.color,
    textDecoration: "underline",
    textDecorationColor: "#ff6500",
    marginBottom: "10px",
  });

  return (
    <Dialog
      sx={{
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: "760px",
          maxWidth: "760px",
          background: theme.backgroundColor,
        },
      }}
      open={isOpen}
      onClose={toogleOpen}
    >
      <TextTitle>{film.title}</TextTitle>
      <DialogContent sx={{ width: "100%" }}>
        <iframe
          width="100%"
          height="400px"
          src={film.clip}
          title={film.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
      <DialogActions>
        <CloseButton onClick={toogleOpen}>Close</CloseButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCase;
