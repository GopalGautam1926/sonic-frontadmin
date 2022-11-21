import { makeStyles } from "@material-ui/styles";
import { drawerWidth } from "../Layout/styles";

export default makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    
  },
  drawerPaper: {
    backgroundColor:theme.palette.background.dark1,
    color:theme.palette.secondary.main,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    backgroundColor:theme.palette.background.dark3,
    fontFamily:`${theme.fontFamily.bold} !important`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },


  listItemRoot: {
    backgroundColor: theme.palette.background.dark1,
    textDecoration: "none",
    textTransform: "uppercase",
    fontFamily:`${theme.fontFamily.bold} !important`,
    color: theme.palette.grey[500],
    "& .MuiListItemIcon-root": {
      color:  theme.palette.grey[500],
    },
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor:theme.palette.secondary.main,
      backgroundColor:`${theme.palette.background.dark2} !important`,
      color: "white" ,
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "& .MuiTypography-body1":{
      fontFamily:`${theme.fontFamily.bold} !important`,
    },
    "& .MuiListItem-root. Mui-selected": {
      
      color: theme.palette.secondary.light,
    },
    "&.Mui-selected": {
      textDecoration: "none",
      fontFamily:`${theme.fontFamily.bold} !important`, 
      backgroundColor: `${theme.palette.background.dark4} !important`,
    },
  },
  listItemSelected: { 
    backgroundColor:theme.palette.primary.main,
    color: theme.palette.primary.main,
    
    "&:hover":{
      color: `${theme.palette.primary.main} !important`,
    },  
    "& .MuiListItemIcon-root": {
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));


