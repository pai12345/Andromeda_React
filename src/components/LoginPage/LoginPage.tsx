import React, {
  Fragment,
  lazy,
  Suspense,
  useState,
  useCallback,
  SyntheticEvent,
  memo,
} from "react";
import { useHistory } from "react-router-dom";
import {
  Endpoint,
  LoginPage_Authenticationresult_Interface,
} from "../../utility/Util";
import { LayoutPanel as Panel } from "fundamental-react/lib/LayoutPanel";
import { POSTCALL } from "../../service/service";
import {
  Error_Customer_enum,
  LoginPage_LoginBody_Interface,
  POSTCALL_Interface,
  Status,
} from "../../utility/Interface";
import generateFunctions from "../../utility/Functions";
import { useDispatch } from "react-redux";
import { authenticate_reducer } from "../../store/slices/single/login";
import generateState from "../../utility/State";

const XgBusyIndicator = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgBusyIndicator,
  }))
);

const XgFormLabelInput = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgFormLabelInput,
  }))
);

const XgFormButton = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgFormButton,
  }))
);

const XgMessageToast = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgMessageToast,
  }))
);

const Link = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.Link,
  }))
);
const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const Grid = lazy(() => import("@material-ui/core/Grid"));

/**
 * Login Page Component
 * @description
 * Component for Login Page
 */
export const LoginPageDialog = memo(() => {
  try {

    //Inital States
    const InitialState = generateState().Login.Main;
    const AlertMessage = generateState().Alert;

    //Functions
    const Validate_LoginPageDetails = generateFunctions()
      .Validate_LoginPageDetails;
    const NullishCoalesce = generateFunctions().NullishCoalesce;

    //redux dispatch
    const dispatch = useDispatch();

    //useContext + useHistory
    const history = useHistory();

    //useState
    const [state, setstate] = useState(InitialState);
    const [state_alertmessage, setAlertMessage] = useState(AlertMessage);

    const { Title, User, Password, SignUp, LoginButton, LoginBody } = state;
    const { open } = state_alertmessage.Alert;

    //Input Function
    const __handleInput = useCallback(
      (data: any, index: number) => {
        const newState = { ...state };
        const newState_index = newState.LoginBody[index];
        newState_index.value = data.target.value;
        switch (index) {
          case 0:
            newState.User = newState_index.value;
            break;
          case 1:
            newState.Password = newState_index.value;
            break;
          default:
            throw new Error("Unkown Input parameters");
        }
        setstate(newState);
      },
      [state]
    );

    //Message Alert Change
    const __handleMessageAlert = useCallback(
      (data: any) => {
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

    //Clear Login Page State
    const __handleClearState = useCallback(() => {
      const newState = { ...state };
      newState.User = "";
      newState.Password = "";
      newState.LoginBody.filter((data: LoginPage_LoginBody_Interface) => {
        return (data.value = "");
      });
    }, [state]);

    //Submit Button
    const __handlesubmit = useCallback(async () => {
      try {
        const Validate_Inputdetails = Validate_LoginPageDetails(state);
        if (
          Validate_Inputdetails.username !== Error_Customer_enum.Customer_Valid
        ) {
          __handleMessageAlert({
            open: true,
            severity: "error",
            text: Validate_Inputdetails.username,
          });
        } else if (
          Validate_Inputdetails.password !== Error_Customer_enum.Customer_Valid
        ) {
          __handleMessageAlert({
            open: true,
            severity: "error",
            text: Validate_Inputdetails.password,
          });
        } else {
          const payload: POSTCALL_Interface = {
            URL: Endpoint.Login as string,
            data: {
              query: `
            fragment LoginResponse_data_fragment on LoginResponse_data {
              customerid
              name
              title
              address
              email
              contactnumber
              dateofbirth
            }
            
            fragment LoginResponse_fragment on LoginResponse {
              status
            }
            
            query GetCustomer($username: String!, $password: String!) {
              Customer: Login(input: {username: $username, password: $password}) {
                ...LoginResponse_fragment
                data {
                 ...LoginResponse_data_fragment
                }
              }
            }          
              `,
              variables: {
                username: User,
                password: Password,
              },
              operationName: "GetCustomer",
            },
          };
          const Authenticate = await POSTCALL(payload);
          if (Authenticate.status === "success") {
            const AuthenticationCheck: LoginPage_Authenticationresult_Interface = NullishCoalesce(
              Authenticate
            );
            if (
              AuthenticationCheck.message.data.data.Customer.status ===
              Status.Success
            ) {
              __handleMessageAlert({
                open: true,
                severity: "success",
                text: "Success",
              });

              setTimeout(() => {
                dispatch(authenticate_reducer({ isAuthenticated: "true" }));
                __handleClearState();
                __handleMessageAlert({
                  open: false,
                });

                history.replace("/List");
              }, 500);
            } else {
              __handleMessageAlert({
                open: true,
                severity: "error",
                text: "Enter valid username and password",
              });
            }
          } else {
            __handleMessageAlert({
              open: true,
              severity: "error",
              text: Authenticate.message.toString(),
            });
          }
        }
      } catch (error) {
        return error;
      }
    }, [
      NullishCoalesce,
      Password,
      User,
      Validate_LoginPageDetails,
      __handleClearState,
      __handleMessageAlert,
      dispatch,
      history,
      state,
    ]);

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
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "70vh" }}
            >
              <Panel style={{ width: "20%" }}>
                <Panel.Header>
                  <Panel.Head title={Title} />
                </Panel.Header>
                <Panel.Body>
                  {LoginBody.map((data: any, index: number) => (
                    <Fragment key={index}>
                      <XgFormLabelInput
                        data={{
                          data: data,
                          index: index,
                          __handleInput: __handleInput,
                        }}
                      />
                    </Fragment>
                  ))}
                  {LoginButton.map((data: any, index: number) => (
                    <Fragment key={index}>
                      <XgFormButton
                        data={{
                          data: data,
                          index: index,
                          __handlesubmit: __handlesubmit,
                        }}
                      />
                    </Fragment>
                  ))}
                </Panel.Body>
              </Panel>
              <br></br>
              <div>
                {SignUp.Text}{" "}
                <Link to={SignUp.Link.URL}>{SignUp.Link.Text}</Link>
              </div>
            </Grid>
            {open ? <XgMessageToast data={MessageData} /> : null}
          </Suspense>
        </NoSsr>
      </Fragment>
    );
  } catch (error) {
    return error;
  }
});
