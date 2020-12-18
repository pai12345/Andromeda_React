import React, {
  memo,
  Fragment,
  Suspense,
  lazy,
  useCallback,
  useState,
  ChangeEvent,
  SyntheticEvent,
  MouseEvent,
} from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import generateState from "../../utility/State";
import {
  XgChat_TabelPanel_Interface,
  // XgChat_XiChatScreen_Interface,
  XgChat_Chatboard_Interface,
} from "../../utility/Interface";
import generatesocket from "../../service/socket";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const SendIcon = lazy(() => import("@material-ui/icons/Send"));
const Fab = lazy(() => import("@material-ui/core/Fab"));
const TextField = lazy(() => import("@material-ui/core/TextField"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const Grid = lazy(() => import("@material-ui/core/Grid"));
const Avatar = lazy(() => import("@material-ui/core/Avatar"));
const ListSubheader = lazy(() => import("@material-ui/core/ListSubheader"));
const ListItemText = lazy(() => import("@material-ui/core/ListItemText"));
const ListItemAvatar = lazy(() => import("@material-ui/core/ListItemAvatar"));
const List = lazy(() => import("@material-ui/core/List"));
const Paper = lazy(() => import("@material-ui/core/Paper"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));
const Tabs = lazy(() => import("@material-ui/core/Tabs"));
const Tab = lazy(() => import("@material-ui/core/Tab"));
const Box = lazy(() => import("@material-ui/core/Box"));

const XgBusyIndicator = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgBusyIndicator,
  }))
);

const XgMessageToast = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgMessageToast,
  }))
);

/**
 * Component - Chat
 * @description
 * Main Component for Chat
 */
const XgChat = memo(() => {
  const Chat_State = generateState().Chat_State;

  const { Screen, SocketOpen } = Chat_State;
  const [state_SocketOpen, setState_SocketOpen] = useState(SocketOpen);

  const SocketOpen_Close = useCallback(() => {
    generatesocket().CustomerCare();
    const newstate_SocketOpen = false;
    setState_SocketOpen(newstate_SocketOpen);
  }, []);

  const _handle_SocketOpen = useCallback(
    (data: any) => {
      return {
        XiChatScreen_Data: data,
        SocketOpen_Close: SocketOpen_Close,
      };
    },
    [SocketOpen_Close]
  );

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
  const [value, setValue] = useState(0);

  const handleChange = useCallback((_event, newValue: number) => {
    setValue(newValue);
  }, []);

  const a11yProps = useCallback((index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }, []);

  const check_icon = useCallback((evt: string) => {
    switch (evt) {
      case "CHANNEL": {
        return <AddCircleIcon />;
      }
      default: {
        return "";
      }
    }
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
                    {Screen.map((data, index) => (
                      <Tab
                        key={index}
                        label={data.Title}
                        {...a11yProps(index)}
                        icon={check_icon(data.Title)}
                      />
                    ))}
                  </Tabs>
                </Grid>
                <Grid item xs={6}>
                  {Screen.map((data, index) => (
                    <Fragment key={index + 1}>
                      <XiTabPanel value={value} index={index}>
                        <XiChatScreen {..._handle_SocketOpen(data)} />
                      </XiTabPanel>
                    </Fragment>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

/**
 * Component - Chat Tab Panel
 * @description
 * Component for Table Panel for Chat.
 */
const XiTabPanel = memo((props: XgChat_TabelPanel_Interface) => {
  const useStyles_Tabs = makeStyles(() => ({
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
});

/**
 * Component - Chat Board
 * @description
 * Component for Chat Board & Messages
 */
// XgChat_XiChatScreen_Interface
const XiChatScreen = memo((props: any) => {
  const XiChatScreen_Styles = makeStyles((theme: Theme) =>
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
  const classes = XiChatScreen_Styles();

  const { XiChatScreen_Data, SocketOpen_Close } = props;
  const { Title, Chat_board, Chat_message } = XiChatScreen_Data;

  const [state_Chat_board, setState_Chat_board] = useState(Chat_board);
  const [state_Chat_message, setState_Chat_message] = useState(Chat_message);

  //============XgMessageToast=============//
  const AlertMessage = generateState().Alert;
  const [state_alertmessage, setAlertMessage] = useState(AlertMessage);
  const { open } = state_alertmessage.Alert;

  //Close Message
  const handleCloseMessage = useCallback(
    (event?: SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      const newState = { ...state_alertmessage };
      newState.Alert.open = false;
      setAlertMessage(newState);
    },
    [state_alertmessage]
  );

  //Props for XgMessageToast
  const MessageData = {
    state: state_alertmessage.Alert,
    handleCloseMessage: handleCloseMessage,
  };

  //Message Alert Change
  const __handleMessageAlert = useCallback(
    (data) => {
      const newState = { ...state_alertmessage };
      const severity = data.severity ?? false;
      const text = data.text ?? false;

      if (severity !== false && text !== false) {
        newState.Alert.open = data.open;
        newState.Alert.Msg.severity = data.severity;
        newState.Alert.Msg.text = data.text;
      } else {
        newState.Alert.open = data.open;
      }
      setAlertMessage(newState);
    },
    [state_alertmessage]
  );
  //=========================================//

  const _handlepress_Chat_board = useCallback(() => {
    if (state_Chat_message === "") {
      __handleMessageAlert({
        open: true,
        severity: "error",
        text: "Enter Message",
      });
    } else {
      const newstate = [...state_Chat_board];
      const newObj = { message: state_Chat_message };
      newstate.push(newObj);
      setState_Chat_message("");
      setState_Chat_board(newstate);
      SocketOpen_Close();
    }
  }, [
    SocketOpen_Close,
    __handleMessageAlert,
    state_Chat_board,
    state_Chat_message,
  ]);

  const _handleChange_Chat_message = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setState_Chat_message(evt.target.value);
    },
    []
  );

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
              {Title !== "CHANNEL" ? (
                <Paper square className={classes.paper}>
                  <Typography
                    component={"span"}
                    className={classes.text}
                    variant="h5"
                    gutterBottom
                  >
                    {Title}
                  </Typography>
                  <List className={classes.list}>
                    <ListSubheader className={classes.subheader}>
                      Today
                    </ListSubheader>
                    {state_Chat_board.map(
                      (data: XgChat_Chatboard_Interface, index: number) => (
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
                      )
                    )}
                  </List>
                  <Divider />
                  <Grid container style={{ padding: "20px" }}>
                    <Grid item xs={11}>
                      <TextField
                        id="outlined-basic-email"
                        label="Type Message"
                        fullWidth
                        value={state_Chat_message}
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
              ) : (
                <XiAddChannel />
              )}
            </Grid>
            {open ? <XgMessageToast data={MessageData} /> : null}
          </Suspense>
        </NoSsr>
      </Fragment>
    </div>
  );
});

/**
 * Component - Create Channel
 * @description
 * Component for Create Channel.
 */
const XiAddChannel = memo(() => {
  const ChatChannel_State = generateState().ChatChannel_State;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const __handleClose = useCallback((evt) => {
    setAnchorEl(null);
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
            justify="flex-start"
            alignItems="flex-start"
          >
            {ChatChannel_State.Types.map((data, index) => (
              <Fragment key={index}>
                <Grid
                  item
                  xs={4}
                  style={{ paddingLeft: "40px", paddingBottom: "30px" }}
                >
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleClick}
                    color="secondary"
                  >
                    {data.ButtonType}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={(evt) => __handleClose(evt)}
                  >
                    {data.ButtonText.map((data_menu, index_menu) => (
                      <MenuItem
                        key={index_menu}
                        onClick={(evt) => __handleClose(evt)}
                      >
                        {data_menu}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default XgChat;
