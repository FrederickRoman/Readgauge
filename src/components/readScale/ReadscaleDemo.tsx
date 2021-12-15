import { Container, Box, Grid, Tabs, Tab, Typography } from "@mui/material";
import RSfileInputSection from "./input/file/RSfileInputSection";
import RSinputSection from "./input/RSinputSection";
import RSoutputSection from "./output/RSoutputSection";

import useScore from "../../hooks/useScore";
import { useState } from "react";
import BookCurveDivider from "../divider/BookCurveDivider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `demo-tab-${index}`,
    "aria-controls": `demo-tabpanel-${index}`,
  };
}

function ReadscaleDemo(): JSX.Element {
  const { text, setText, score, running } = useScore();
  const blank = text === "";
  const [value, setValue] = useState<0 | 1>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: 0 | 1) => {
    setValue(newValue);
  };

  return (
    <Box
      component="section"
      mx={1}
      mb={10}
      sx={{ bgcolor: "background.paper" }}
    >
      <BookCurveDivider place="top" />
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "background.paper" }}
        >
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper !important",
                    display: "flex",
                    height: 224,
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Tab label="Text" {...a11yProps(0)} />
                    <Tab label="File" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <RSinputSection text={text} setText={setText} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box my={5}>
                      <RSfileInputSection setText={setText} />
                    </Box>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ bgcolor: "background.paper" }}>
            <Box my={5}>
              <RSoutputSection blank={blank} score={score} running={running} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <BookCurveDivider place="bottom" />
    </Box>
  );
}

export default ReadscaleDemo;
