import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Popover
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { observer } from "mobx-react";
import { useStore } from "../../stores";

function Header({ open, handleDrawerOpen }) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          SonicData
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

const ProfileMenu = observer(() => {
  const [profileMenu, setProfileMenu] = React.useState(null);
  const classes = useStyles();
  const { sessionStore } = useStore();

  return (
    <div>
      <Button
        color="inherit"
        size="small"
        onClick={(e) => setProfileMenu(e.currentTarget)}
        endIcon={<ArrowDropDownIcon />}
        style={{ textTransform: "none" }}
      >
        {sessionStore.getUser?.username || "Guest"}
      </Button>
      <Popover
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Divider light />
        <MenuItem
          onClick={() => {
            sessionStore.logout().catch((err) => {
              alert(err.message || "error");
            });
          }}
          // className={classes.dropdownItem}
        >
          Logout
        </MenuItem>
      </Popover>
    </div>
  );
});
