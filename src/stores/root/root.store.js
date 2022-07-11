import { globalStore } from "../global"
import { apiKeyStore, companyStore, licenseKeyStore, playsStore, radioStationStore, userStore, sonicKeyStore, partnerStore, profileStore, tracksStore, reportsdetectionStore, companyReportStore } from '../core';
import { sessionStore } from '../session/session.store';
import { releaseStore } from "../core/release.store"

class RootStore {
    globalStore = globalStore
    apiKeyStore = apiKeyStore
    licenseKeyStore = licenseKeyStore
    radioStationStore = radioStationStore
    sessionStore = sessionStore
    companyStore = companyStore
    partnerStore = partnerStore
    userStore = userStore
    playsStore = playsStore
    sonickeyStore = sonicKeyStore
    releaseStore = releaseStore
    profileStore = profileStore
    tracksStore = tracksStore
    companyReportStore = companyReportStore
    reportsdetection = reportsdetectionStore

    constructor() {
        //Do some initial stuffs
    }
}

export const rootStore = new RootStore()