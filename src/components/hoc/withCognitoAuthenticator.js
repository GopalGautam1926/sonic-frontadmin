import React, { useEffect, useState } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import {
  AmplifyAuthenticator,
  AmplifyContainer,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { useStore } from "../../stores";
import { log } from "../../utils/app.debug";
import Logo from "../Logo/Logo";
import { observer } from "mobx-react";
import { toast } from 'react-toastify';
import { fetchInitialData } from '../../stores';

export default function withCognitoAuthenticotor(WrappedComponent) {
  return observer((props) => {
    const { sessionStore } = useStore();
    useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
        sessionStore.setSession(authData?.signInUserSession, nextAuthState);
        log("nextAuthState", nextAuthState);
        log("authData", authData);
        switch (nextAuthState) {
          case AuthState.SignedIn:
            if (
              !authData?.signInUserSession?.accessToken?.payload?.[
                "cognito:groups"
              ]?.includes("Admin")
            ) {
              toast.error("You must be admin to access this portal")
              sessionStore.logout();
              return;
            }
            localStorage.setItem(
              "user_info",
              JSON.stringify(authData.signInUserSession)
            );
            sessionStore.setSession(authData?.signInUserSession, nextAuthState);
            // fetch initial store data on loggedIn
            fetchInitialData()
            break;
          case AuthState.SignIn:
            localStorage.removeItem("user_info");
            break;

          default:
            break;
        }
      });
    }, []);

    if (
      sessionStore.authState == AuthState.SignedIn &&
      sessionStore.getSession &&
      localStorage.getItem("user_info")
    ) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <AmplifyContainer>
          <AmplifyAuthenticator>
            <AmplifySignIn slot="sign-in" headerText="">
              <div
                slot="header-subtitle"
                style={{ color: "white", textAlign: "center" }}
              >
                <div>
                  <Logo />
                </div>
              </div>
              <div slot="secondary-footer-content"></div>
            </AmplifySignIn>
          </AmplifyAuthenticator>
        </AmplifyContainer>
      );
    }
  });
}
