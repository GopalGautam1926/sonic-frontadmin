import { makeStyles } from "@material-ui/styles";
import { drawerWidth } from '../Layout/styles';

export default makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper:{
    // backgroundColor:theme.palette.primary.main,
    // color:'white'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  listItemRoot:{
    textDecoration:'none',
    color:theme.palette.other.grey[700],
    '&:hover':{
      color:theme.palette.primary.light,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.light
      }
    },
    "&$selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
  },
  listItemSelected:{
    color:theme.palette.primary.light,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.light
    }
  }
}));
