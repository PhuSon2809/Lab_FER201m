import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Add from "./components/Add";
import News from "./components/News";
import About from "./components/About";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import PresentationFilm from "./components/PresentationFilm";
import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./components/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App">
      <Navigation />
      <Container
        maxWidth={1}
        sx={{
          background: theme.backgroundContent,
          p: "30px 0 50px 0",
          minHeight: "73vh",
        }}
      >
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<PresentationFilm />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
