import React, { useEffect } from "react";
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

export default function withCognitoAuthenticotor(WrappedComponent) {
  return observer((props) => {
    const { sessionStore, profileStore } = useStore();

    useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
        sessionStore.setSession(authData?.signInUserSession, nextAuthState);
        log("nextAuthState", nextAuthState);
        log("authData", authData);
        switch (nextAuthState) {
          case AuthState.SignedIn:
            profileStore.fetchAdminProfile(authData?.signInUserSession?.accessToken?.jwtToken)
            localStorage.setItem("user_info", JSON.stringify(authData.signInUserSession));
            sessionStore.setSession(authData?.signInUserSession, nextAuthState);
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
    }

    else {
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
