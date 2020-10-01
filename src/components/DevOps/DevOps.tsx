import React, { Fragment, memo, lazy } from "react";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

const DevOps = memo(() => {
  return (
    <Fragment>
      <NoSsr>Hallo</NoSsr>
    </Fragment>
  );
});

export default DevOps;
