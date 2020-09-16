import React, { Fragment, memo, Suspense, lazy, useState } from "react";
import { XgBusyIndicator } from "./Reusable";
import generateState from "../utility/State";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));
const XgTile = lazy(() =>
  import("./Reusable").then((module) => ({
    default: module.XgTile,
  }))
);

/**
 * Component - Survey Page
 * @description
 * Component for Survey Page
 */
const SurveyPage = memo(() => {
  const InititalState = generateState().Survey;
  const [state] = useState(InititalState);

  const TileData = {
    state: state,
  };

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
          <XgTile data={TileData}></XgTile>
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default SurveyPage;
