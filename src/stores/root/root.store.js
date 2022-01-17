import { globalStore } from "../global"
import { apiKeyStore, licenseKeyStore, radioStationStore, sonickeyStore } from '../core';
import { sessionStore } from '../session/session.store';


class RootStore {
    globalStore = globalStore
    apiKeyStore = apiKeyStore
    licenseKeyStore = licenseKeyStore
    radioStationStore = radioStationStore
    sessionStore = sessionStore
    sonickeyStore = sonickeyStore

    constructor() {
        //Do some initial stuffs
    }
}

export const rootStore = new RootStore()