import React, { memo, Fragment, Suspense, lazy,useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { XgBusyIndicator } from "../Reusable/Reusable";
import { createStyles, Theme  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

const TabPanel = (props) => {
  
  const { children, value, index, ...other } = props;

  return (
    <Fragment>
    <NoSsr>
    <Suspense
      fallback={
        <Fragment>
          <XgBusyIndicator />
        </Fragment>
      }
    >
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
    </Suspense>
    </NoSsr>
    </Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const XgChat = memo(() => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const a11yProps = (index:number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  },[]);

  return (
    <Fragment>
      <NoSsr>
        <Suspense
          fallback={
            <Fragment>
              <XgBusyIndicator />
            </Fragment>
          }
        >
           <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "60vh" }}
          >
            <Grid item xs={12}>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Customer Care" {...a11yProps(0)} />
              <Tab label="Friend" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <ChatScreen></ChatScreen>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <ChatScreen></ChatScreen>
            </TabPanel>
          </div>
          </Grid>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});


const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
];

const ChatScreen_Styles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

const ChatScreen = memo(() => {
  const classes = ChatScreen_Styles();

  return (
    <Fragment>
       <NoSsr>
        <Suspense
          fallback={
            <Fragment>
              <XgBusyIndicator />
            </Fragment>
          }
        >
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Chat
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary}/>
              </ListItem>
            </Fragment>
          ))}
        </List>
      </Paper>
      </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default XgChat;