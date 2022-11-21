import defaultTheme from "./default";
import { createTheme,responsiveFontSizes } from "@material-ui/core/styles";

const overrides = {
  typography: {
    fontSize: 14,
    fontFamily: defaultTheme.fontFamily.regular,
    
  },
  overrides: {
    MUIDataTable: {
      paper: {
        backgroundColor: 'inherit',
        color: defaultTheme.palette.primary.contrastText
      }
    },
    MUIDataTableToolbar: {
      icon: {
        color: 'white'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: 'inherit',
        borderColor: defaultTheme.palette.background.dark5
      }
    },
    MUIDataTableBodyCell: {
      root: {
        borderColor: defaultTheme.palette.background.dark5
      }
    },
  }
};

const themes = {
  default: responsiveFontSizes(createTheme({ ...defaultTheme, ...overrides })),
};

export default themes;
