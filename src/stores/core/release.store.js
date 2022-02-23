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
        // makeObservable(this);
    }
      @observable filters = {
        platform: "",
    };
    @computed
    get getVersions() {
        return toJS(this.versionData.versions);
    }
    @computed
    get getFilters() {
        return toJS(this.filters);
    }

    @action
    changeFilters(filters) {
        this.filters = filters;
    }

    @action
    resetFilter() {
        this.filters = {
            platform: "",
        }
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    fetchVersions(platform, options={}) {
        this.loading = true;
        this.error = null;
          let newOptions = {
            params: {
                sort: "-latest",
                "platform": this.filters.platform || undefined,
            }
        }
          options=deepmerge(newOptions,options)
        releaseHttps.fetchVersions(options)
            .then(({ data }) => {
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
    this.versionData.versions = this.getVersions.filter(
      (version) => version?._id !== versionId
    );
    this.versionData.totalVersions -= 1;
  }
  @action
  addVersion(newVersion) {
    if(newVersion.latest){
      this.versionData.versions.forEach(version => {
        if(version.platform === newVersion.platform && version.latest)
           version.latest = false;
      });
     this.versionData.versions.unshift(newVersion)
    }else{
      this.versionData.versions.push(newVersion)
    }
  }

  @action
  updateVersion(newVersion) {
    if(newVersion.latest){
      this.versionData.versions.forEach(version => {
        if(version.platform === newVersion.platform && version.latest){
           version.latest = false;
        }
        if(version._id === newVersion._id){
          version.versionCode = newVersion.versionCode
          version.releaseNote = newVersion.releaseNote
          version.platform = newVersion.platform
          version.latest = newVersion.latest
        }
      });
      this.versionData.versions =  this.versionData.versions.filter(version => {
        return(version._id !==  newVersion._id ) 
      });
     this.versionData.versions.unshift(newVersion)
    }else{
      this.versionData.versions.forEach(version => {
        if(version._id === newVersion._id){
          version.versionCode = newVersion.versionCode
          version.releaseNote = newVersion.releaseNote
          version.platform = newVersion.platform
          version.latest = newVersion.latest
        }
      });
    }
  }

}

export const releaseStore = new ReleaseStore()