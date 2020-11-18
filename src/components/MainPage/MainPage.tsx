import React, { memo, Fragment, useCallback, lazy, Suspense } from "react";
import { MainPage_Provider_Interface } from "../../utility/Interface";
import { useSelector } from "react-redux";
import generateSelectors from "../../store/selectors/root";
import { XgBusyIndicator } from "../Reusable/Reusable";

const XiEcommerce = lazy(() => import("../Ecommerce/Ecommerce"));
const SurveyPage = lazy(() => import("../Survey/Survey"));
const XgChat = lazy(() => import("../Chat/Chat"));
const NoSsr = lazy(() => import("@material-ui/core/NoSsr"));

/**
 * Component - MainPage
 * @description
 * Component for Main Page
 */
const MainPage = memo(() => {
  //Selector
  const MainSelector = generateSelectors().MainSelector;
  const select = useSelector(MainSelector);

  //Selection Mode
  const ClickIconText = useCallback((data: MainPage_Provider_Interface) => {
    let i: string;
    for (i in data) {
      switch (i) {
        case "Ecommerce":
          return <XiEcommerce />;
        case "DevOps":
          break;
        case "Mail":
          break;
        case "Survey":
          return <SurveyPage />;
        case "Chat":
          return <XgChat />;
        default:
          break;
      }
    }
  }, []);

  //Generate Component
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
          {ClickIconText(select)}
        </Suspense>
      </NoSsr>
    </Fragment>
  );
});

export default MainPage;
