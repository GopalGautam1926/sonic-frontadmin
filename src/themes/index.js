import defaultTheme from "./default";
import { createTheme,responsiveFontSizes } from "@material-ui/core/styles";

const overrides = {
  typography: {
    fontSize: 14,
    fontFamily: defaultTheme.fontFamily.regular,
    
  },
  overrides: {
    MuiInput: {
      root: {
        color: defaultTheme.palette.primary.contrastText,
      },
      underline: {
        '&:before': {
          borderColor: `${defaultTheme.palette.grey[400]} !important`,
        }
      }
    },
    MUIDataTable: {
      paper: {
        backgroundColor: 'inherit',
        color: defaultTheme.palette.primary.contrastText
      }
    },
    MUIDataTableToolbar: {
      icon: {
        color: defaultTheme.palette.primary.contrastText
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: 'inherit',
        // borderBottom: `1px solid ${defaultTheme.palette.primary.contrastText}`,
      }
    },
    MUIDataTableBodyCell: {
      root: {
        // borderBottom: `1px solid ${defaultTheme.palette.primary.contrastText}`,
        // borderColor: defaultTheme.palette.primary.contrastText,
      }
    },
    MUIDataTableViewCol: {
      root: {
        background: defaultTheme.palette.background.dark5,
        color: defaultTheme.palette.primary.contrastText
      },
      title: {
        color: 'inherit',
      },
      checked: {
        color: `${defaultTheme.palette.secondary.main} !important`,
      }
    }
  }
};

const themes = {
  default: responsiveFontSizes(createTheme({ ...defaultTheme, ...overrides })),
};

export default themes;
