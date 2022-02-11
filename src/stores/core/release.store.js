import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import releaseHttps from "../../services/https/resources/release.https";
import deepmerge from 'deepmerge'

class ReleaseStore {
    @observable loading = false;
    @observable error = null;
    // @observable versions = []
    // @observable totalVersions = 0;
    @observable versionData = {
        versions: [],
        totalVersions: 0,
        offset: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
      };

    constructor() {
    }

    @computed
    get getVersions() {
        return toJS(this.versionData);
    }
    // @computed
    // get getTotalVersions() {
    //     return toJS(this.totalVersions);
    // }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    fetchVersions(platform, options={}) {
        this.loading = true;
        this.error = null;
        const defaultOptions = {
            params:{
              sort:'-createdAt',
              limit:1000
            },
          }
          options=deepmerge(defaultOptions,options)
        releaseHttps.fetchVersions(platform,options)
            .then(({ data }) => {
                console.log("Version Data", data)
                this.versionData.versions = data
                this.versionData.totalVersions = data.length;
                this.loading = false;
            })
            .catch((err) => {
                log("Version Error", err)
                this.error = err;
                this.loading = false;
            })
    }

  @action
  removeVersion(versionId) {
    this.versionData.versions = this.getVersions.versions.filter(
      (version) => version?._id !== versionId
    );
    this.versionData.totalVersions -= 1;
  }

}

export const releaseStore = new ReleaseStore()