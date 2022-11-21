import { makeStyles } from "@material-ui/styles";

export const drawerWidth = 300;
export default makeStyles((theme) => ({
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: theme.palette.grey[400] + " !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: theme.palette.primary.main,
    },
  },
  underlineError: {
    "&:after": {
      borderColor: theme.palette.danger.main,
    },
  },
  underlineSuccess: {
    "&:after": {
      borderColor: theme.palette.success.main,
    },
  },
  labelRoot: {
    // ...defaultFont,
    // color: theme.palette.grey[600] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    letterSpacing: "unset",
  },
  labelRootError: {
    color: theme.palette.danger.main,
  },
  labelRootSuccess: {
    color: theme.palette.success.main,
  },
  visibilityIcon: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    cursor: 'pointer'
  },
  countryselect: {
    position: "absolute",
    top: "18px",
    right: "0",
    borderWidth: "0px",
    border: 'none',
    borderBottomWidth: "0px !important",
    zIndex: "2",
    display: "block",
    width: "100px",
    height: "24px",
    textAlign: "center",
    cursor: 'pointer'
  },
  countrySelectOption: {
    fontFamily:theme.fontFamily.bold,
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none",
  },
  marginTop: {
    marginTop: "16px",
  },
  formControl: {
    fontFamily:theme.fontFamily.bold,
    paddingBottom: "10px",
    position: "relative",
    verticalAlign: "unset",
  },
  customDropDownDisabled: {
    '& .MuiSelect-select.Mui-disabled': {
      color: theme.palette.grey[400],
    }
  }
}));
