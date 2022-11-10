import {
  observable,
  action,
  computed,
  toJS,

  // makeObservable,
} from "mobx";
import Amplify from "aws-amplify";

class SessionStore {
  @observable loading = false;
  @observable session = null;
  @observable authState = "";

  // constructor() {
  //    makeObservable(this);
  // }

  @computed
  get getSession() {
    return toJS(this.session);
  }

  @computed
  get getUser() {
    return toJS(this.session)?.accessToken?.payload;
  }

  @computed
  get getAccessToken() {
    return toJS(this.session)?.idToken?.jwtToken;
  }

  @action
  setSession(session, authState) {
    this.session = session;
    this.authState = authState;
  }

  @action
  async logout() {
    await Amplify.Auth.signOut();
    this.session = null;
    this.authState = "";
  }
}

export const sessionStore = new SessionStore();
