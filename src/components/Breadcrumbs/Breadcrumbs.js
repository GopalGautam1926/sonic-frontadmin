import React from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MUIBreadcrumbs from "@material-ui/core/Breadcrumbs";
import { log } from "../../utils/app.debug";
import { Card } from "@material-ui/core";
const Breadcrumbs = ({ routes }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); //convert pathnames into array of paths
  const crumbs = [];
  for (let index = 0; index < pathnames.length; index++) {
    const pathname = pathnames[index];
    const last = index === pathnames.length - 1;
    const to = `/${pathnames.slice(0, index + 1).join("/")}`; //appending each path to construct new path log this for more
    for (let i = 0; i < routes.length; i++) {
      const { path, layout, name, ...rest } = routes[i];
      const matchData = matchPath(to, {
        //check whether constructed path is matching with our definned path
        path: layout + path,
        exact: true,
        strict: true,
      });
      if (matchData?.isExact) {
        //if matched add for crumbs item
        crumbs.push({
          isLast: last,
          to: to,
          name: name,
        });
      }
    }
  }
  return (
    <Card style={{ padding: 8 }} elevation={0} id="app_breadcrumbs">
      <MUIBreadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) => {
          if (crumb.isLast) {
            return <Typography key={index} color="textPrimary">{crumb.name}</Typography>;
          } else {
            return (
              <Link key={index} color="inherit" to={crumb.to}>
                {crumb.name}
              </Link>
            );
          }
        })}
      </MUIBreadcrumbs>
    </Card>
  );
};
export default Breadcrumbs;
