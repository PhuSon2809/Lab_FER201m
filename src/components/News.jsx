import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import NewCard from "./NewCard";
import NewCardCol from "./NewCardCol";
import { ThemeContext } from "./ThemeContext";
import { ListOfNews } from "../shared/ListOfNews";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function News() {
  const { dark } = useContext(ThemeContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container>
        <Grid item md={9}>
          <Box sx={{ width: "100%", pr: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                sx={{
                  ".css-1gsv261": {
                    borderColor: !dark ? "#000 !important" : "#fff !important",
                  },
                  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                    color: "#ff6500",
                  },
                  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
                    color: !dark ? "#000" : "#fff",
                  },
                  ".css-1aquho2-MuiTabs-indicator": {
                    backgroundColor: "#ff6500",
                  },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab color="warning" label="Odd Movie" {...a11yProps(0)} />
                <Tab color="warning" label="Series Movie" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {ListOfNews.map((newItem) => (
                <NewCard key={newItem.id} newItem={newItem} />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                {ListOfNews.map((newItem) => (
                  <Grid key={newItem.id} item md={6}>
                    <NewCardCol newItem={newItem} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <img
            style={{ marginTop: "75px", marginBottom: "20px" }}
            src="/assets/images/film-column.gif"
            alt=""
          />
          <img src="/assets/images/film-column1.png" alt="" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default News;
