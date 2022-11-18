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
        backgroundColor: theme.palette.background.dark3,
      },
      /* for login of cognito */
      ':root' : {
        '--amplify-background-color': theme.palette.background.dark5,
        '--amplify-primary-color': theme.palette.secondary.main,
        '--amplify-primary-tint': theme.palette.secondary.main,
        '--amplify-primary-shade': theme.palette.secondary.main,
        '--amplify-secondary-color': '#bbbbbb',
        '--amplify-secondary-contrast': theme.palette.background.dark5,
      },
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;