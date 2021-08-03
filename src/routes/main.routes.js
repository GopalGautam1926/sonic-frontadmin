import React, { useEffect, useState } from "react";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import { routesData,flattenRoutes } from "./routes.data";
import { log } from '../utils/app.debug';
import { fetchInitialData } from '../stores';
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const MainRoutes = () => {
  // useEffect(() => {
  //   fetchInitialData()
  // }, [])
  return (
    <Switch>
      <Redirect from="/" to="/admin/dashboard" exact />
      {flattenRoutes().map(({layout,path,component,exact,...rest},key)=>(
        <Route path={layout + path} component={component} key={path} exact={exact} />
      ))}
      <Redirect to="/" />
      
    </Switch>
  );
};