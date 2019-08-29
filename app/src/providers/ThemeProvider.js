import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
  typography: {
    useNextVariants: true,
  },
});

export default ({ children }) => (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </CssBaseline>
);
