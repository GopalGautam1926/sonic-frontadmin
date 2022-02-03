import { globalStore } from "../global"
import { apiKeyStore, companyStore, licenseKeyStore, radioStationStore, sonickeyStore, userStore } from '../core';
import { sessionStore } from '../session/session.store';
import { groupStore } from "../core/group.store";
import {releaseStore} from "../core/release.store"

class RootStore {
    globalStore = globalStore
    apiKeyStore = apiKeyStore
    licenseKeyStore = licenseKeyStore
    radioStationStore = radioStationStore
    sessionStore = sessionStore
    sonickeyStore = sonickeyStore
    companyStore = companyStore
    groupStore = groupStore
    userStore = userStore
    releaseStore = releaseStore

    constructor() {
        //Do some initial stuffs
    }
}

export const rootStore = new RootStore()