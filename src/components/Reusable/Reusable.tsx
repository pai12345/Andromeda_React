import React, {
  Fragment,
  memo,
  lazy,
  Suspense,
  MouseEvent,
  useCallback,
  useReducer,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  Appbar_MenuBar_Interface,
  AppBar_HeaderIcon_Interface,
} from "../../utility/Util";
import {XgTile_Interface} from "../../utility/Interface";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {
  XgFormLabelInput_Interface,
  XgFormButton_Interface,
  XgFormLabelCombobox_Interface,
} from "../../utility/Interface";
import { useSelector, useDispatch } from "react-redux";
import generateSelectors from "../../store/selectors/root";
import { authenticate_reducer } from "../../store/slices/single/login";
import { selectmode_reducer } from "../../store/slices/single/main";
import generateFunctions from "../../utility/Functions";
import generateState from "../../utility/State";

const AppBar = lazy(() => import("@material-ui/core/AppBar"));
const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const Menu = lazy(() => import("@material-ui/core/Menu"));
const MenuItem = lazy(() => import("@material-ui/core/MenuItem"));
const AccountCircle = lazy(() => import("@material-ui/icons/AccountCircle"));
const Drawer = lazy(() => import("@material-ui/core/Drawer"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));
const ChevronLeftIcon = lazy(() => import("@material-ui/icons/ChevronLeft"));
const ChevronRightIcon = lazy(() => import("@material-ui/icons/ChevronRight"));
const MailIcon = lazy(() => import("@material-ui/icons/Mail"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const CloudQueueIcon = lazy(() => import("@material-ui/icons/CloudQueue"));
const ShopIcon = lazy(() => import("@material-ui/icons/Shop"));
const ListItemText = lazy(() => import("@material-ui/core/ListItemText"));
const ListItemIcon = lazy(() => import("@material-ui/core/ListItemIcon"));
const ListItem = lazy(() => import("@material-ui/core/ListItem"));
const List = lazy(() => import("@material-ui/core/List"));
const Paper = lazy(() => import("@material-ui/core/Paper"));
const Grid = lazy(() => import("@material-ui/core/Grid"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const MenuIcon = lazy(() => import("@material-ui/icons/Menu"));
const Toolbar = lazy(() => import("@material-ui/core/Toolbar"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));

const AssignmentTurnedInIcon = lazy(
  () => import("@material-ui/icons/AssignmentTurnedIn")
);

const ShoppingCartIcon = lazy(() => import("@material-ui/icons/ShoppingCart"));
const NotificationsIcon = lazy(
  () => import("@material-ui/icons/Notifications")
);

const PowerSettingsNewIcon = lazy(
  () => import("@material-ui/icons/PowerSettingsNew")
);

const Link = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.Link,
  }))
);

const FormGroup = lazy(() =>
  import("fundamental-react/lib/Forms").then((module) => ({
    default: module.FormGroup,
  }))
);
const FormInput = lazy(() =>
  import("fundamental-react/lib/Forms").then((module) => ({
    default: module.FormInput,
  }))
);
const FormItem = lazy(() =>
  import("fundamental-react/lib/Forms").then((module) => ({
    default: module.FormItem,
  }))
);
const FormLabel = lazy(() =>
  import("fundamental-react/lib/Forms").then((module) => ({
    default: module.FormLabel,
  }))
);

const Button = lazy(() =>
  import("fundamental-react/lib/Button").then((module) => ({
    default: module.Button,
  }))
);

const ComboboxInput = lazy(() =>
  import("fundamental-react/lib/ComboboxInput").then((module) => ({
    default: module.ComboboxInput,
  }))
);

/**
 * Component - 404 Not Found Pag
 * @description
 * Component for Not Found Page
 */
export const XgNotFoundPage = () => {
  const NotFoundPage_State = generateState().NoFound;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate_reducer({ isAuthenticated: false }));
  }, [dispatch]);
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
            style={{ minHeight: "50vh" }}
          >
            <Grid item xs={8} lg={5} md={8} sm={8} xl={8}>
              <Paper style={{ paddingBottom: "30px" }}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <h1 style={{ textAlign: "center" }}>
                    {NotFoundPage_State.Header}
                  </h1>
                  <p style={{ textAlign: "center" }}>
                    {NotFoundPage_State.Content}
                  </p>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Link to="/">{NotFoundPage_State.Link}</Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
};

/**
 * Component - ListItem
 * @description
 * Component for ListItem
 */
// MainPage_ListItem_Interface
const XgListItem = memo((props: any) => {
  const { state, dispatch, selectmode, dispatchUpdate } = props.data;

  const assignicon = useCallback((data: string) => {
    switch (data) {
      case "Ecommerce":
        return <ShopIcon />;
      case "DevOps":
        return <CloudQueueIcon />;
      case "Mail":
        return <MailIcon />;
      case "Survey":
        return <AssignmentTurnedInIcon />;
      default:
        throw new Error("Unkown Data");
    }
  }, []);

  const ClickIconText = useCallback(
    (data: string) => {
      dispatch({ type: "Drawer", open: false });
      const newState = { ...selectmode };
      newState.Ecommerce = false;
      newState.DevOps = false;
      newState.Mail = false;
      newState.Survey = false;

      switch (data) {
        case "Ecommerce":
          dispatch({ type: "SelectionType", selection: "Ecommerce" });
          newState.Ecommerce = true;
          break;
        case "DevOps":
          dispatch({ type: "SelectionType", selection: "DevOps" });
          newState.DevOps = true;
          break;
        case "Mail":
          dispatch({ type: "SelectionType", selection: "Mail" });
          newState.Mail = true;
          break;
        case "Survey":
          dispatch({ type: "SelectionType", selection: "Survey" });
          newState.Survey = true;
          break;
        default:
          break;
      }
      dispatchUpdate(selectmode_reducer({ SelectionState: newState }));
    },
    [dispatch, selectmode, dispatchUpdate]
  );

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
          {state.ListData.map((data, index: number) => (
            <Fragment key={index}>
              <List>
                {data.List1.map((item: string) => (
                  <ListItem
                    button
                    key={item}
                    onClick={() => ClickIconText(item)}
                  >
                    <ListItemIcon>{assignicon(item)}</ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              {index !== state.ListData.length - 1 ? <Divider /> : null}
            </Fragment>
          ))}
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

/**
 * Component - Header Right IconButton
 * @description
 * Component for Header Right IconButton
 */
const XgHeaderRightIconButton = memo((props: AppBar_HeaderIcon_Interface) => {
  const theme = useTheme();

  //Generate Components
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
          <IconButton onClick={props.data}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

/**
 * Component - AppBar
 * @description
 * Component for Header tab for App
 */
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

// AppBar_Props_Interface
export const XgSideNav = memo(() => {
  //Function Generators
  const Authentication_Selector = generateSelectors().AuthenticationSelector;
  const MainSelector = generateSelectors().MainSelector;
  const AppBar_ReducerFunction = generateFunctions().AppBar_ReducerFunction;
  const Shellbar_State = generateState().Shellbar_State;
  const MainPage_State = generateState().MainPage_State;

  const newstate = {
    Shellbar: Shellbar_State,
    anchorEl: null,
    open: false,
    search: false,
  };

  //useReducer
  const [state, dispatch] = useReducer(AppBar_ReducerFunction, newstate);

  //Features
  const history = useHistory();
  const classes = useStyles();
  const dispatchUpdate = useDispatch();

  //Selectors
  const isAuthenticated = useSelector(Authentication_Selector);
  const selectdata = useSelector(MainSelector);

  const { Shellbar, anchorEl, open, search } = state;
  const { productTitle, alt, src, MenuBar } = Shellbar;
  const openanchorEl = Boolean(anchorEl);

  //Open Drawer
  const handleDrawerOpen = useCallback(() => {
    dispatch({ type: "Drawer", open: true });
  }, []);

  //Drawer Close
  const handleDrawerClose = useCallback(() => {
    dispatch({ type: "Drawer", open: false });
  }, []);

  //Close handle
  const handleClose = useCallback(() => {
    dispatch({ type: "AnchroEl", open: null });
  }, []);

  //Menu control
  const handleMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    dispatch({ type: "AnchroEl", open: event.currentTarget });
  }, []);

  //Logout button
  const Logout = useCallback(() => {
    dispatch({ type: "Logout", open: false, selection: "Andromeda" });
    history.replace("/");
  }, [history]);

  //State for Drawer List
  const XgListItem_State = {
    state: MainPage_State,
    dispatch: dispatch,
    selectmode: selectdata,
    dispatchUpdate: dispatchUpdate,
  };

  //AppBar Menu
  const __handlechoosemenu = useCallback(
    (type: any) => {
      switch (type) {
        case "Account":
          return (
            <MenuItem>
              <AccountBoxIcon />
              &nbsp; {type}
            </MenuItem>
          );
        case "Settings":
          return (
            <MenuItem>
              <SettingsIcon />
              &nbsp; {type}
            </MenuItem>
          );
        case "Sell":
          return (
            <MenuItem>
              <MonetizationOnIcon />
              &nbsp; {type}
            </MenuItem>
          );
        case "Customer Care":
          return (
            <MenuItem>
              <ContactSupportIcon />
              &nbsp; {type}
            </MenuItem>
          );

        case "Logout":
          return (
            <MenuItem onClick={Logout}>
              <PowerSettingsNewIcon />
              &nbsp; {type}
            </MenuItem>
          );
        default:
          throw new Error("Unkown Menu Type");
      }
    },
    [Logout]
  );

  //Generate Components
  return (
    <Fragment>
      <Suspense
        fallback={
          <Fragment>
            <XgBusyIndicator />
          </Fragment>
        }
      >
        <div className={classes.grow}>
          <CssBaseline />
          <AppBar position="static" style={{ backgroundColor: "#354a5f" }}>
            <Toolbar>
              {isAuthenticated ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              ) : null}
              <img src={src} alt={alt} />
              &nbsp;
              <Typography variant="h6" className={classes.title}>
                {productTitle}
              </Typography>
              {isAuthenticated ? (
                <Fragment>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      {search ? <SearchIcon /> : null}
                    </div>
                    {search ? (
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    ) : null}
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop} />
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenu}
                  >
                    {selectdata.Ecommerce ? (
                      <Fragment>
                        <ShoppingCartIcon />
                      </Fragment>
                    ) : null}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <NotificationsIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={openanchorEl}
                    onClose={handleClose}
                  >
                    {MenuBar.map(
                      (menubutton: Appbar_MenuBar_Interface, index: number) => (
                        <div key={index}>
                          {__handlechoosemenu(menubutton.Text)}
                        </div>
                      )
                    )}
                  </Menu>
                </Fragment>
              ) : null}
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <XgHeaderRightIconButton data={handleDrawerClose} />
            </div>
            <Divider />
            <XgListItem data={XgListItem_State} />
          </Drawer>
        </div>
      </Suspense>
    </Fragment>
  );
});

/**
 * Component - Busy Indicator For Suspense
 * @description
 * Component for Busy Indicator For Suspense
 */
export const XgBusyIndicator = memo(() => {
  return <Fragment>Loading...</Fragment>;
});

/**
 * Component - Message
 * @description
 * Component for Message
 */
const useStyles_Message = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

// Message_Interface
export const XgMessageToast = (props: any) => {
  const classes = useStyles_Message();
  const { state, handleCloseMessage } = props.data;
  const { open, Msg } = state;

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleCloseMessage}
      >
        <Alert severity={Msg.severity}>{Msg.text}</Alert>
      </Snackbar>
    </div>
  );
};

/**
 * Component - Tile
 * @description
 * Component for  Tiles
 */
export const XgTile = memo((props: XgTile_Interface) => {
  const { state } = props.data;
  const { link, tiles } = state;
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
          <br></br>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            {tiles.map((data, index) => (
              <Fragment key={index}>
                <Grid item xs={8} lg={3} md={8} sm={8} xl={8}>
                  <Paper style={{ paddingBottom: "30px" }}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <h2 style={{ textAlign: "center", color: "#354a5f" }}>
                        {data.header}
                      </h2>
                      <p style={{ textAlign: "center" }}>{data.text}</p>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Link to={`${data.path}`}>{link}</Link>
                    </Grid>
                  </Paper>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

/**
 * Component - Form Button
 * @description
 * Component for Form Button
 */
export const XgFormButton = memo((props: XgFormButton_Interface) => {
  const { data, index, __handlesubmit } = props.data;
  return (
    <Fragment>
      <FormGroup>
        <FormItem>
          <br />
          <Fragment key={index}>
            <Button option={data.type} compact={true} onClick={__handlesubmit}>
              {data.Text}
            </Button>
          </Fragment>
        </FormItem>
      </FormGroup>
    </Fragment>
  );
});

/**
 * Component - Form Label + Input
 * @description
 * Component for Form Label + Input
 */
export const XgFormLabelInput = memo((props: XgFormLabelInput_Interface) => {
  const { data, index, __handleInput } = props.data;

  return (
    <Fragment key={index}>
      <FormGroup key={data.Label}>
        <FormItem>
          <FormLabel compact={"true"} htmlFor={`input-${data.Label}`} required>
            {data.Label}
          </FormLabel>
          <FormInput
            autoComplete="off"
            compact={true}
            id={`input-${data.Label}`}
            value={data.value}
            type={data.type}
            onChange={(evt: string) => __handleInput(evt, index)}
            placeholder={data.placeholder}
          />
        </FormItem>
      </FormGroup>
    </Fragment>
  );
});

/**
 * Component - Form Label + Combobox
 * @description
 * Component for Form Label + Combobox
 */
export const XgFormLabelCombobox = memo(
  (props: XgFormLabelCombobox_Interface) => {
    const { data, index } = props.data;

    return (
      <Fragment key={index}>
        <FormGroup>
          <FormItem>
            <FormLabel
              compact={"true"}
              htmlFor={`input-${data.Label}`}
              required
            >
              {data.Label}
            </FormLabel>
            <ComboboxInput
              compact
              options={data.Combobox}
              placeholder={data.placeholder}
            />
          </FormItem>
        </FormGroup>
      </Fragment>
    );
  }
);
