import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";
import { releaseStore } from "../../../stores/core/release.store";
var FormData = require('form-data');
var fs = require('fs');
class ReleaseHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchVersions(options = {}) {
        return AppWebRequest({
            method: "get",
            url: `app-version`,
            ...options
        });
    }
    
    editVersion(value) {
        return AppWebRequest({
            method: "put",
            url: `app-version/mark-latest/${value}`,
        });
    }

    uploadVersion(data) {
        return AppWebRequest({
            method: "post",
           data: data,
            url: "app-version/upload",
        });
    }

    findById(versionId){
      return AppWebRequest({
        method: "get",
        url: `app-version/${versionId}`,
    });
    }

    downloadVersion(versionId){
      return AppWebRequest({
        method: "get",
        url: `app-version/download-file/${versionId}`,
    });
    }

      /**
   * delete license key
   * @param {string} key
   * @returns
   */
  deleteVersion(version) {
    return AppWebRequest({
      method: "delete",
      url: `/app-version/${version}`,
    }).then((res) => {
        releaseStore.removeVersion(version);
      return res;
    });
  }
  updateVersion(versionId, version){
    return AppWebRequest({
      method: "put",
      data:version,
      url: `/app-version/${versionId}`,
    }).then((res) => {
      return res;
    });

  }
}

export default new ReleaseHttps();
