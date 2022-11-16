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
    backgroundColor:theme.palette.primary.dark,
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
    backgroundColor: theme.palette.primary.dark,
    textDecoration: "none",
    color: theme.palette.grey[400],
    "&:hover": {
      backgroundColor:`${theme.palette.primary.light} !important`,
      color: theme.palette.primary.contrastText ,
      "& .MuiListItemIcon-root": {
        color: `${theme.palette.secondary.main} !important`,
      },
    },
    "& .MuiListItem-root. Mui-selected": {
      color: theme.palette.secondary.main,
    },
    "&.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
  listItemSelected: { 
    color: theme.palette.secondary.main,
    "&:hover":{
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.main,
    },
    "& .MuiListItemIcon-root": {
      color: `${theme.palette.secondary.main} !important`,
    },
    
  },

  listItem:{
    backgroundColor:theme.palette.primary.dark,
    color:theme.palette.grey[400],
    "&:hover": {
      backgroundColor:`${theme.palette.primary.light} !important`,
      color: theme.palette.secondary.main ,
      "& .MuiListItemIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
    "& .MuiListItem-root. Mui-selected": {
      backgroundColor:`${theme.palette.secondary.light} !important`,
      color: theme.palette.secondary.light,
    },
    "&.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: theme.palette.secondary.light
    },
  },
}));


