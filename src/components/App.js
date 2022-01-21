import React from "react";
import Layout from "./Layout/Layout";
import withCognitoAuthenticotor from './hoc/withCognitoAuthenticator';
function App() {
  return (
    <Layout />
  )
}

export default withCognitoAuthenticotor(App);
