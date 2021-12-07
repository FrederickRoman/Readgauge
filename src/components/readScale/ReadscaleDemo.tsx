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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ReadscaleDemo(): JSX.Element {
  const { text, setText, score, running } = useScore();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <BookCurveDivider place="top" />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background",
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
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="Text" {...a11yProps(0)} />
                <Tab label="File" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <RSinputSection text={text} setText={setText} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <RSfileInputSection setText={setText} />
              </TabPanel>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="span" m={5}>
              <RSoutputSection score={score} running={running} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <BookCurveDivider place="bottom" />
    </>
  );
}

export default ReadscaleDemo;
