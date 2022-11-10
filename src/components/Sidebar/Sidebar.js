import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import { observer } from "mobx-react";
import Logo from "../Logo/Logo";
import { hasChildren } from "../../utils/general.utils";
// import { menudatasets } from './menudatasets';
import { routesData } from "../../routes/routes.data";
import { Link, useLocation, matchPath } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

export default observer(({ open, handleDrawerClose, handleDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.drawerPaper]: true,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Logo />
        <IconButton
          style={{ position: "absolute", right: 0 }}
          onClick={handleDrawerClose}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {routesData.map((route, key) => (
          <MenuItem key={key} route={route} />
        ))}
      </List>
    </Drawer>
  );
});

const MenuItem = ({ route }) => {
  const routeToCheckAndModify = { ...route }
  if (!routeToCheckAndModify.sidebar) return null
  if (routeToCheckAndModify.routes) {
    routeToCheckAndModify.routes = routeToCheckAndModify?.routes?.filter?.(rou => rou.sidebar)
  }
  const Component = hasChildren(routeToCheckAndModify) ? MultiLevel : SingleLevel;
  return <Component route={routeToCheckAndModify} />;
};

const SingleLevel = ({ route }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <ListItem
      component={Link}
      to={route.layout + route.path}
      classes={{ root: classes.listItemRoot, selected: classes.listItemSelected }}
      button
      selected={location.pathname === `${route.layout}${route.path}`}
    >
      <ListItemIcon>{route.icon}</ListItemIcon>
      <ListItemText primary={route.name} />
    </ListItem>
  );
};
const MultiLevel = ({ route }) => {
  const { routes: children } = route;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation()
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const matched = matchPath(location.pathname, {
      path: route?.layout + route?.parentPath,
    });
    if (matched) {
      setOpen(true)
    }
  }, [location])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <ListItem className={classes.listItem} button onClick={handleClick}>
        <ListItemIcon>{route.icon}</ListItemIcon>
        {/* <ListItemText primary={route.name} /> */}
        <ListItemText>
          <Tooltip title={route.name}>
            <Typography noWrap>
              {route.name}
            </Typography>
          </Tooltip>
        </ListItemText>

        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.listItem}>
          {children.map((child, key) => (
            <MenuItem key={key} route={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
