import {
  observable,
  action,
  computed,
  toJS
} from "mobx";

import { log } from "../../utils/app.debug";
import licensekeysHttps from "../../services/https/resources/licensekeys.https";
import deepmerge from 'deepmerge'
import {cloneDeep} from 'lodash'

class LicenseKeyStore {
  @observable loading = false;
  @observable error = null;
  @observable licenseKeys = {
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 10,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 0,
    nextPage: 0,
  };


  @observable licenseKeyTablePage = 1;

  //Pagination
  @computed
  get getLicenseKeyTablePage() {
      return toJS(this.licenseKeyTablePage);
  }

  @action
  changeLicenseKeyTablePage(page) {
      this.licenseKeyTablePage = page;
  }
  /* ----------------------------- */

  @computed
  get getLicenseKeys() {
    return toJS(this.licenseKeys);
  }

  createTableData(data=this.getLicenseKeys?.docs||[]) {
    const dataSource = cloneDeep(data)
    return dataSource.map(obj=>{
      obj["totalUsers"]=obj?.users?.length || 0
      obj["maxEncodeUses"]=obj.isUnlimitedEncode?"Unlimited":obj.maxEncodeUses
      obj["maxMonitoringUses"]=obj.isUnlimitedEncode?"Unlimited":obj.maxMonitoringUses
      return obj
    })
  }

  /**
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  @action
  fetchLicenseKeys(page = 1, options = {}) {
    this.loading = true;
    this.error = null;
    const defaultOptions={
      params:{
        sort:'-createdAt',
        limit: this.licenseKeys.limit,
        page: page,
        skip: page > 1 ? (page - 1) * this.licenseKeys.limit : 0,
      },
    }
    options=deepmerge(defaultOptions,options)
    licensekeysHttps
    .fetchLicenseKeys(options)
    .then(({ data }) => {
      log("licensekeys", data);
      this.licenseKeys = data;
      this.loading = false;
    })
    .catch((err) => {
      log("licensekeys err", err);
      this.loading = false;
      this.error = err;
    });
    
  }

  /**
   *add key to store
   * @param {object} licenseKey
   */
  @action
  addLicenseKey(licenseKey) {
    this.licenseKeys.docs.unshift(licenseKey);
    this.licenseKeys.totalDocs += 1;
  }
  /**
   *add key to store
   * @param {string} key
   */
  @action
  removeLicenseKey(key) {
    this.licenseKeys.docs = this.licenseKeys.docs.filter(
      (lic) => lic?.key !== key
    );
    this.licenseKeys.totalDocs -= 1;
  }

  /**
   *update key to store
   * @param {string} key
   * @param {object} payload
   */
   @action
   updateLicenseKey(key,payload) {
    const elementsIndex = this.licenseKeys.docs.findIndex(element => element.key === key )
    this.licenseKeys.docs[elementsIndex]={...this.licenseKeys.docs[elementsIndex],...payload}
   }
}

export const licenseKeyStore = new LicenseKeyStore();
