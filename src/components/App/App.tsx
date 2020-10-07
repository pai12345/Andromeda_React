import React, { Fragment, lazy, Suspense } from "react";
import "./App.css";
import { XgBusyIndicator } from "../Reusable/Reusable";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

const XgSideNav = lazy(() =>
  import("../Reusable/Reusable").then((module) => ({
    default: module.XgSideNav,
  }))
);

const DevOps = lazy(() => import("../DevOps/DevOps"));
const SurveyPage = lazy(() => import("../Survey/Survey"));

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

const SignUp = lazy(() =>
  import("../SignupPage/SignupPage").then((module) => ({
    default: module.SignUp,
  }))
);

const LoginPageDialog = lazy(() =>
  import("../LoginPage/LoginPage").then((module) => ({
    default: module.LoginPageDialog,
  }))
);

const XgMainPage = lazy(() => import("../MainPage/MainPage"));

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
            <Route path="/SignUp" component={SignUp} />
            <Route path="/DevOps" component={DevOps} />
            <Route path="/Survey" component={SurveyPage} />
            <Route path="/NotFound" component={XgNotFoundPage} />
            <Redirect to="/NotFound" />
          </Switch>
        </NoSsr>
      </Suspense>
    </Fragment>
  );
};

export default App;
