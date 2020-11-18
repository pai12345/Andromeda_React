import React, { Fragment, lazy, Suspense } from "react";
import "./App.css";
import { XgBusyIndicator } from "../Reusable/Reusable";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const XgMainPage = lazy(() => import("../MainPage/MainPage"));
const XgSignUp = lazy(() => import("../SignupPage/SignupPage"));

const XgSideNav = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgSideNav,
  }))
);

const Switch = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.Switch,
  }))
);

const Route = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.Route,
  }))
);

const Redirect = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.Redirect,
  }))
);

const LoginPageDialog = lazy(() =>
  import("../LoginPage/LoginPage").then((module) => ({
    default: module.LoginPageDialog,
  }))
);

const XgNotFoundPage = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgNotFoundPage,
  }))
);

/**
 * Component - App
 * @description
 * Component for App
 */
const App = () => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <Fragment>
            <XgBusyIndicator />
          </Fragment>
        }
      >
        <NoSsr>
          <XgSideNav />
          <Switch>
            <Route path="/" exact component={LoginPageDialog} />
            <Route path="/List" component={XgMainPage} />
            <Route path="/SignUp" component={XgSignUp} />
            <Route path="/NotFound" component={XgNotFoundPage} />
            <Redirect to="/NotFound" />
          </Switch>
        </NoSsr>
      </Suspense>
    </Fragment>
  );
};

export default App;
