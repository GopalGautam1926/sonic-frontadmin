import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import releaseHttps from "../../services/https/resources/release.https";

class ReleaseStore {
    @observable loading = false;
    @observable error = null;
    @observable versions = []

    constructor() {
    }

    @computed
    get getVersions() {
        return toJS(this.versions);
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    fetchVersions(platform) {
        this.loading = true;
        this.error = null;
        releaseHttps.fetchVersions(platform)
            .then(({ data }) => {
                console.log("Version Data", data)
                this.versions = data
                this.loading = false;
            })
            .catch((err) => {
                log("Version Error", err)
                this.error = err;
                this.loading = false;
            })
    }
}

export const releaseStore = new ReleaseStore()