import React, { useEffect, useState } from "react";
import { flattenRoutes } from "../../routes/routes.data";
import Breadcrumbs from "./Breadcrumbs";
export default function withBreadcrumbs(WrappedComponent) {
  return (props) => {
    return (
        <div>
            <Breadcrumbs routes={flattenRoutes()}/>
            <WrappedComponent {...props} />
        </div>
    );
  };
}
