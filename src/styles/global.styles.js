import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      'a': {
        textDecoration: 'none',
        color:theme.palette.primary.main,
        '&:hover':{
            textDecoration: 'underline',
            color:theme.palette.primary.main,
        }
      },
      body: {
        backgroundColor: theme.palette.primary.main,
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;