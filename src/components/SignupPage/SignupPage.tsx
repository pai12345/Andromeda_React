import React, {
  Fragment,
  lazy,
  Suspense,
  useState,
  useCallback,
  memo,
} from "react";
import { useHistory } from "react-router-dom";
import { LayoutPanel as Panel } from "fundamental-react/lib/LayoutPanel";
import { SignUp_LoginBody_Interface } from "../../utility/Interface";
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

const XgFormLabelCombobox = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgFormLabelCombobox,
  }))
);

const XgFormButton = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgFormButton,
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
 * SignUp Page Component
 * @description
 * Component for SignUp Page
 */
 const XgSignUp = memo(() => {
  //Functions
  const InitialState = generateState().SignUp;

  //State
  const [state, setState] = useState(InitialState);

  //Features
  const history = useHistory();

  const { Title, SignUp, LoginButton, LoginBody } = state;

  //Input function
  const __handleInput = useCallback(
    (data: any, index: number) => {
      const newState = { ...state };
      const newState_index = newState.LoginBody[index];
      newState_index.value = data.target.value;
      setState(newState);
    },
    [state]
  );

  //Submit function
  const __handlesubmit = useCallback(() => {
    history.replace("/List");
  }, [history]);

  //Generate Components for Input and Combobox
  const assignSubComponent = useCallback(
    (data: SignUp_LoginBody_Interface, index: number) => {
      switch (data.component) {
        case "Combobox":
          return <XgFormLabelCombobox data={{ data: data, index: index }} />;
        default:
          return (
            <XgFormLabelInput
              data={{ data: data, index: index, __handleInput: __handleInput }}
            />
          );
      }
    },
    [__handleInput]
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            <Panel style={{ width: "20%" }}>
              <Panel.Header>
                <Panel.Head title={Title} />
              </Panel.Header>
              <Panel.Body>
                {LoginBody.map(
                  (data: SignUp_LoginBody_Interface, index: number) => (
                    <Fragment>{assignSubComponent(data, index)}</Fragment>
                  )
                )}
                {LoginButton.map((data: any, index: any) => (
                  <XgFormButton
                    data={{
                      data: data,
                      index: index,
                      __handlesubmit: __handlesubmit,
                    }}
                  />
                ))}
              </Panel.Body>
            </Panel>
            <br></br>
            <div>
              {SignUp.Text} <Link to={SignUp.Link.URL}>{SignUp.Link.Text}</Link>
            </div>
          </Grid>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default XgSignUp;