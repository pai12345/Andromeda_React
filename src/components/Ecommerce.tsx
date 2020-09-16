import React, {
  useState,
  ChangeEvent,
  ReactNode,
  memo,
  lazy,
  Suspense,
  Fragment,
} from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const Grid = lazy(() => import("@material-ui/core/Grid"));
const Box = lazy(() => import("@material-ui/core/Box"));
const Tab = lazy(() => import("@material-ui/core/Tab"));
const Tabs = lazy(() => import("@material-ui/core/Tabs"));
const AppBar = lazy(() => import("@material-ui/core/AppBar"));

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const XiEcommerce = memo(() => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <NoSsr>
        <Suspense fallback={<Fragment>Loading Please Wait....</Fragment>}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: "10.5vh" }}
          >
            <div className={classes.root}>
              <AppBar position="static" style={{ backgroundColor: "#354a5f" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Electronics & Appliance" {...a11yProps(0)} />
                  <Tab label="Books" {...a11yProps(1)} />
                  <Tab label="Sports" {...a11yProps(2)} />
                  <Tab label="Fashion" {...a11yProps(3)} />
                  <Tab label="Home & Living" {...a11yProps(4)} />
                  <Tab label="Toys & Collectibles" {...a11yProps(5)} />
                  <Tab label="Health & Essentials" {...a11yProps(6)} />
                  <Tab label="Groceries" {...a11yProps(7)} />
                  <Tab label="Top Offers" {...a11yProps(8)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                Electronics & Appliance
              </TabPanel>
              <TabPanel value={value} index={1}>
                Books
              </TabPanel>
              <TabPanel value={value} index={2}>
                Sports
              </TabPanel>
              <TabPanel value={value} index={3}>
                Fashion
              </TabPanel>
              <TabPanel value={value} index={4}>
                Home & Living
              </TabPanel>
              <TabPanel value={value} index={5}>
                Toys & Collectibles
              </TabPanel>
              <TabPanel value={value} index={6}>
                Health & Essentials
              </TabPanel>
              <TabPanel value={value} index={7}>
                Groceries
              </TabPanel>
              <TabPanel value={value} index={8}>
                Top Offers
              </TabPanel>
            </div>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default XiEcommerce;
