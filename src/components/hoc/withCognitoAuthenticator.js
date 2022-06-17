import React, { useEffect } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import {
  AmplifyAuthenticator,
  AmplifyContainer,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { fetchInitialData, useStore } from "../../stores";
import { log } from "../../utils/app.debug";
import Logo from "../Logo/Logo";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import Loading from "../common/Loading";

export default function withCognitoAuthenticotor(WrappedComponent) {
  return observer((props) => {
    const { sessionStore, profileStore } = useStore();

    useEffect(() => {
      return onAuthUIStateChange(async (nextAuthState, authData) => {
        sessionStore.setSession(authData?.signInUserSession, nextAuthState);
        log("nextAuthState", nextAuthState);
        log("authData", authData);
        switch (nextAuthState) {
          case AuthState.SignedIn:
            log("CurrentAuthState", AuthState.SignedIn)
            const profile = await profileStore.fetchAdminProfile(authData?.signInUserSession?.accessToken?.jwtToken)
            log("profile", profile)
            if (profile?.userRole !== "Admin") {
              toast.error("You must be admin to access this portal", { toastId: "NotAdminError" })
              sessionStore.logout();
              return;
            }
            localStorage.setItem("user_info", JSON.stringify(authData.signInUserSession));
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

    if (profileStore.loading) {
      return <Loading
        message={"Fetching user profile"}
        style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      />
    }

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
