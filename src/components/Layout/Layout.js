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
import Loading from "../common/Loading";
import { useStore } from "../../stores";

export default observer(({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { profileStore } = useStore();

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

  if (profileStore.loading) {
    return <Loading
      message={"Fetching user profile"}
      style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  }
  else {
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
  }
});
