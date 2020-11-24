import React, {
  memo,
  Fragment,
  Suspense,
  lazy,
  useCallback,
  useState,
  ChangeEvent,
} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { XgBusyIndicator } from "../Reusable/Reusable";
import { createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import generateState from "../../utility/State";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

/**
 * Component - Chat Tab Panel
 * @description
 * Component for Table Panel for Chat.
 */
const TabPanel = (props) => {
  const useStyles_Tabs = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles_Tabs();
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
            className={classes.root}
          >
            {value === index && (
              <Box p={3}>
                <Typography component={"span"}>{children}</Typography>
              </Box>
            )}
          </div>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

/**
 * Component - Chat
 * @description
 * Component for Chat
 */
const XgChat = memo(() => {
  const useStyles_XgChat = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      height: "auto",
    },
    tabs: {
      flexGrow: 1,
      display: "flex",
      height: "auto",
      borderRight: `1px solid ${theme.palette.divider}`,
      textAlign: "center",
    },
  }));
  const classes = useStyles_XgChat();
  const [value, setValue] = React.useState(0);

  const a11yProps = useCallback((index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }, []);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

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
            direction="row"
            justify="center"
            alignItems="center"
            style={{ minHeight: "70vh" }}
          >
            <Grid item xs={10} style={{ paddingLeft: "30px" }}>
              <div className={classes.root}>
                <Grid item xs={2}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                  >
                    <Tab label="Customer Care" {...a11yProps(0)} />
                    <Tab label="Emergency" {...a11yProps(1)} />
                    <Tab label="Friend" {...a11yProps(1)} />
                  </Tabs>
                </Grid>
                <Grid item xs={6}>
                  <TabPanel value={value} index={0}>
                    <ChatScreen />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ChatScreen />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <ChatScreen />
                  </TabPanel>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

const ChatScreen = memo(() => {
  const Chat_State = generateState().Chat_State;
  const { Chat_board, Chat_message } = Chat_State;

  const [state_Chat_board, setState_Chat_board] = useState(Chat_board);
  const [state_Chat_message, setState_Chat_message] = useState(Chat_message);

  const _handlepress_Chat_board = useCallback(() => {
    const newstate = [...state_Chat_board];
    const newObj = {"message":state_Chat_message};
    newstate.push(newObj);
    setState_Chat_board(newstate);
  }, [state_Chat_board, state_Chat_message]);

  const _handleChange_Chat_message = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setState_Chat_message(evt.target.value);
    },
    []
  );

  const ChatScreen_Styles = makeStyles((theme: Theme) =>
    createStyles({
      text: {
        padding: theme.spacing(2, 2, 0),
      },
      paper: {
        paddingBottom: 50,
        width: "170%",
      },
      list: {
        marginBottom: theme.spacing(2),
        overflowY: "auto",
        height: "300px",
      },
      subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto",
      },
    })
  );
  const classes = ChatScreen_Styles();

  return (
    <div className={classes.grow}>
      <Fragment>
        <NoSsr>
          <Suspense
            fallback={
              <Fragment>
                <XgBusyIndicator />
              </Fragment>
            }
          >
            <Grid item xs={12}>
              <CssBaseline />
              <Paper square className={classes.paper}>
                <Typography
                  component={"span"}
                  className={classes.text}
                  variant="h5"
                  gutterBottom
                >
                  Chat
                </Typography>
                <List className={classes.list}>
                  <ListSubheader className={classes.subheader}>
                    Today
                  </ListSubheader>
                  {state_Chat_board.map((data, index) => (
                    <Fragment key={index}>
                      {data.message ? (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={""} />
                          </ListItemAvatar>
                          <ListItemText primary={data.message} />
                        </ListItem>
                      ) : null}
                    </Fragment>
                  ))}
                </List>
                <Divider />
                <Grid container style={{ padding: "20px" }}>
                  <Grid item xs={11}>
                    <TextField
                      id="outlined-basic-email"
                      label="Type Message"
                      fullWidth
                      defaultValue={state_Chat_message}
                      onChange={(evt) => _handleChange_Chat_message(evt)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Fab size="small" color="primary" aria-label="add">
                      <SendIcon onClick={_handlepress_Chat_board} />
                    </Fab>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Suspense>
        </NoSsr>
      </Fragment>
    </div>
  );
});

export default XgChat;