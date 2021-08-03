import defaultTheme from "./default";

import { createTheme,responsiveFontSizes } from "@material-ui/core/styles";

const overrides = {
  typography: {
    fontSize: 14
  },
};

const themes = {
  default: responsiveFontSizes(createTheme({ ...defaultTheme, ...overrides })),
};

export default themes;
