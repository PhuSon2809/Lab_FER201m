import { createContext, useEffect, useState } from "react";

const themes = {
  dark: {
    backgroundColor: "#161819",
    backgroundContent: "#262a2e",
    color: "white",
    icon: "white",
  },
  light: {
    backgroundColor: "white",
    backgroundContent: "#f9f9ff",
    color: "black",
    icon: "#ff6500",
  },
};

const initalState = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};

const ThemeContext = createContext(initalState);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  //On mount, read the preferred theme from the persistence
  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    console.log("On mount => isDark: ", isDark);
    //store the state mode to the local storage
    setDark(isDark);
  }, [dark]);

  //To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setDark(isDark);
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
