import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import useStyles from "./styles";
import { observer } from "mobx-react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { MainRoutes } from "../../routes/main.routes";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { flattenRoutes } from "../../routes/routes.data";

export default observer(({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  useEffect(() => {
    if (matches) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  }, [matches]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Sidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs routes={flattenRoutes()} />
        <MainRoutes />
      </main>
    </div>
  );
});
