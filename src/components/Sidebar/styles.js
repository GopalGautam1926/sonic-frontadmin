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
    "& .MuiListItem-root. Mui-selected": {
      
      color: theme.palette.secondary.light,
    },
    "&.Mui-selected": {
      textDecoration: "none",
      backgroundColor: `${theme.palette.background.dark2} !important`,
    },
  },
  listItemSelected: { 
    color: theme.palette.primary.main,
    "&:hover":{
      color: `${theme.palette.primary.main} !important`,
    },  
    "& .MuiListItemIcon-root": {
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));


