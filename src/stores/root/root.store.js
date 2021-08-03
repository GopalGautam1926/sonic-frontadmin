import { globalStore } from "../global"
import { apiKeyStore,licenseKeyStore } from '../core';
import { sessionStore } from '../session/session.store';


class RootStore {
    globalStore=globalStore
    apiKeyStore=apiKeyStore
    licenseKeyStore=licenseKeyStore
    sessionStore=sessionStore

   constructor() {
       //Do some initial stuffs
   }
}

export const rootStore = new RootStore()