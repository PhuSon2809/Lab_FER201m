import React, { useContext } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ThemeContext } from "./ThemeContext";

const BoxTime = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#5e5f5f",
  fontSize: "0.875rem",
});

function NewCardCol({ newItem }) {
  const { theme, dark } = useContext(ThemeContext);

  const CardBox = styled(Card)({
    width: "90%",
    height: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: dark ? "#000" : "#fff",
    padding: "1.5rem",
    marginBottom: "3rem",
    borderRadius: "20px",
    boxShadow:
      "3px 4px 2px -2px rgb(255 101 0 / 20%), 3px 2px 2px 3px rgb(255 101 0 / 14%), 3px 2px 4px 1px rgb(255 101 0 / 12%)",
  });

  const Title = styled(Typography)({
    lineHeight: 1.2,
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "15px",
    color: theme.color,

    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "#ff6500",
      textUnderlineOffset: "3px",
      textDecorationThickness: "2px",
    },
  });

  const Paragraph = styled(Typography)({
    marginBottom: "0.5rem",
    lineHeight: 1.8,
    height: "auto",
    textAlign: "justify",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    color: theme.color,
  });

  return (
    <CardBox>
      <Grid container>
        <Grid item md={12}>
          <div className="card-image">
            <img className="img-hover" src={newItem.imgae} />
          </div>
        </Grid>
        <Grid item md={12}>
          <Box sx={{ pt: 3 }}>
            <Title>{newItem.title}</Title>
            <Paragraph>{newItem.description}</Paragraph>
            <BoxTime>
              <CalendarMonthIcon fontSize="small" /> {newItem.time}
            </BoxTime>
          </Box>
        </Grid>
      </Grid>
    </CardBox>
  );
}

export default NewCardCol;
