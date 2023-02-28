import React, { useContext, useEffect, useState } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginGoogle from "./LoginGoogle";
import { ThemeContext } from "./ThemeContext";
import { setLoading } from "../features/login/loginSlide";

const pages = [
  { title: "Home", icon: <HomeIcon fontSize="medium" />, link: "/" },
  {
    title: "About",
    icon: <InfoOutlinedIcon fontSize="medium" />,
    link: "/about",
  },
  {
    title: "New",
    icon: <NewspaperOutlinedIcon fontSize="medium" />,
    link: "/news",
  },
  {
    title: "Contact",
    icon: <ContactMailIcon fontSize="medium" />,
    link: "/contact",
  },
];

function Navigation() {
  const dispatch = useDispatch();
  const { theme, toggle, dark } = useContext(ThemeContext);
  const { isLoading } = useSelector((state) => state.login);

  const [isLogin, setIsLogin] = useState();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
  }, [isLoading]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    dispatch(setLoading());
  };

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: theme.backgroundColor,
        color: "#ff6500",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieFilterOutlinedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FILMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                p: 0,
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ backgroundColor: theme.backgroundColor }}
                >
                  <NavLink
                    to={page.link}
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      startIcon={page.icon}
                      onClick={handleCloseNavMenu}
                      className="btn-menu"
                      sx={{ color: theme.color, display: "flex" }}
                    >
                      {page.title}
                    </Button>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MovieFilterOutlinedIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "1.5rem",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FILMS
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, ml: "auto", mr: "auto" }}
          >
            {pages.map((page, index) => (
              <NavLink
                key={index}
                to={page.link}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                style={{ textDecoration: "none" }}
              >
                <Button
                  startIcon={page.icon}
                  onClick={handleCloseNavMenu}
                  className="btn-menu"
                  sx={{ color: theme.color, display: "flex", mr: 2, ml: 2 }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <IconButton onClick={toggle}>
              {!dark ? (
                <DarkModeOutlinedIcon sx={{ color: theme.icon }} />
              ) : (
                <LightModeOutlinedIcon sx={{ color: theme.icon }} />
              )}
            </IconButton>
            {isLogin ? (
              <IconButton
                sx={{ p: 0, ml: 2, mr: 2 }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <Avatar alt={isLogin.name} src={isLogin.imageUrl} />
              </IconButton>
            ) : (
              <LoginGoogle />
            )}
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem sx={{ p: 1 }} onClick={handleClose}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
