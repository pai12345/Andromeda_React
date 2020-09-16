import { createSelector } from "reselect";

const AuthenticationSelector = createSelector(
  (state: any) => state.Authenticate.isAuthenticated,
  (isAuthenticated: any) => isAuthenticated
);

const MainSelector = createSelector(
  (state: any) => state.Main,
  (SelectMode: any) => SelectMode
);

const generateSelectors = () => {
  return {
    AuthenticationSelector: AuthenticationSelector,
    MainSelector: MainSelector,
  };
};

export default generateSelectors;
