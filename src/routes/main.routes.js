import React from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import { flattenRoutes } from "./routes.data";


export const MainRoutes = () => {
  // useEffect(() => {
  //   fetchInitialData()
  // }, [])
  return (
    <Switch>
      <Redirect from="/" to="/admin/dashboard" exact />
      {flattenRoutes().map(({ layout, path, component, exact, ...rest }, key) => (
        <Route path={layout + path} component={component} key={path} exact={exact} />
      ))}
      <Redirect to="/" />

    </Switch>
  );
};