import React,{Fragment,memo,Suspense,lazy} from 'react';
import { XgBusyIndicator } from "../Reusable/Reusable";

const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

const XgChat = memo(() =>{
    return <Fragment>
          <NoSsr>
          <Suspense fallback={
          <Fragment>
            <XgBusyIndicator />
          </Fragment>}>
              <div>Hallo</div>
          </Suspense>
          </NoSsr>
    </Fragment>
});

export default XgChat;