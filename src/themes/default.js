import tinycolor from "tinycolor2";
import * as colors from '@material-ui/core/colors';

const primary = "#EDE363";
const secondary = "#596CF7";
const warning = "#FFA500";
const success = "#4caf50";
const info = "#9013FE";
const danger = "#f44336";
const rose = "#e91e63";
const black = "#000";
const white = "#FFF";
const purple = "#9c27b0"
const grey = colors.grey;

const lightenRate = 7.5;
const darkenRate = 15;

const defaultTheme = {
  palette: {
    white,
    black,
    grey,
    primary: {
      main: primary,
      // light: tinycolor(primary)
      //   .lighten(lightenRate)
      //   .toHexString(),
      // dark: tinycolor(primary)
      //   .darken(darkenRate)
      //   .toHexString(),
      light: "#efe776",
      dark: "#eadf48",
      contrastText: white
    },
    secondary: {
      main: secondary,
      // light: tinycolor(secondary)
      //   .lighten(lightenRate)
      //   .toHexString(),
      // dark: tinycolor(secondary)
      //   .darken(darkenRate)
      //   .toHexString(),
      light: "#6d7df8",
      dark: "#3c52f6",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    danger: {
      main: danger,
      light: tinycolor(danger)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(danger)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    rose: {
      main: rose,
      light: tinycolor(rose)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(rose)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    purple: {
      main: purple,
      light: tinycolor(purple)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(purple)
        .darken(darkenRate)
        .toHexString(),
        contrastText:white
    },
    text: {
      primary: "#white",
      secondary: "#6E6E6E",
      warning:white,
      success:white,
      info:white,
      danger:white,
      rose:white,
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: '#F3F5FF',
      dark1: '#141414',
      dark2: '#232323',
      dark3: '#282828',
      dark4: '#353435',
      dark5: '#424042',

    },
    other:colors
  },
  fontFamily:{
    bold:"FuturaBold",
    regular:"FuturaRegular",
    medium:"FuturaMedium",
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    // MuiBackdrop: {
    //   root: {
    //     backgroundColor: "#4A4A4A1A",
    //   },
    // },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiCardContent:{
      root:{
        
      }
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#F3F5FF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#F3F5FF",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTablePagination:{
      root:{
        color:`${primary} !important`,
      },
      selectIcon:{
        color:`${primary} !important`,
      }
    },
    PrivateSwitchBase: {
      root: {
        marginLeft: 10
      }
    },

  },
};

export default defaultTheme;
