import React from "react";
import ReactDOM from "react-dom";
import "./css/global.styles.css";
import App from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import themes from "./themes";
import { rootStore, StoreProvider } from "./stores";
import { BrowserRouter } from "react-router-dom";
import Amplify from "aws-amplify";
import { awsConfig } from './config/aws.config';
import { ToastContainer} from 'react-toastify';
import GlobalStyles from "./styles/global.styles";

import "./assets/fonts/FuturaBold.otf";
import "./assets/fonts/FuturaMedium.otf";
import "./assets/fonts/FuturaRegular.otf";

Amplify.configure(awsConfig)
ReactDOM.render(
  <BrowserRouter>
  <ThemeProvider theme={themes.default}>
    <StoreProvider value={rootStore}>
      <CssBaseline />
      <GlobalStyles/>
      <App />
    </StoreProvider>
  </ThemeProvider>
  <ToastContainer 
  position="top-center"
  newestOnTop
  hideProgressBar
  autoClose={3000}
  pauseOnFocusLoss={false}
  />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
