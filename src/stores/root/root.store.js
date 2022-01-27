import { globalStore } from "../global"
import { apiKeyStore, companyStore, licenseKeyStore, playsStore, radioStationStore, userStore, sonicKeyStore } from '../core';
import { sessionStore } from '../session/session.store';
import { groupStore } from "../core/group.store";

class RootStore {
    globalStore = globalStore
    apiKeyStore = apiKeyStore
    licenseKeyStore = licenseKeyStore
    radioStationStore = radioStationStore
    sessionStore = sessionStore
    companyStore = companyStore
    groupStore = groupStore
    userStore = userStore
    playsStore = playsStore
    sonickeyStore = sonicKeyStore

    constructor() {
        //Do some initial stuffs
    }
}

export const rootStore = new RootStore()