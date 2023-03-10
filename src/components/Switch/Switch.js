import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";
import { useTheme } from "@material-ui/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    // width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: theme.palette.primary.main,
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export const Switch = IOSSwitch;

export function SwitchWithLabel({ label, checked, onChange, ...rest }) {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={<IOSSwitch checked={checked} onChange={onChange} {...rest} />}
      label={label}
      style={{color: theme.palette.primary.contrastText}}
    />
  );
}
