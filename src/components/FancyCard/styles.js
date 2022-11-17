import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb } from "../../utils/general.utils";
export default makeStyles((theme) => ({
  card: {
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 30,
    backgroundColor: theme.palette.background.dark4,
  },
  cardHeader: {
    margin: "-20px 15px 0px 15px",
    zIndex: 2,
    minHeight: 80,
    position: "relative",
    backgroundColor: "transparent",
    boxShadow: "none",
  },

  cardIconContainer: {
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(theme.palette.black) + ", 0.14)",
  },
  cardCategory: {
    color: theme.palette.other.grey[500],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(theme.palette.white) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: theme.palette.other.grey[700],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: theme.palette.other.grey[500],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: theme.palette.white,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: theme.palette.other.grey[500],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));
