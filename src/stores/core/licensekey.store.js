import {
  observable,
  action,
  computed,
  toJS,
  autorun,
  reaction,
  // makeObservable,
  // makeAutoObservable,
  when,
  observe,
} from "mobx";
import { AxiosRequestConfig } from "axios";
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

  @computed
  get getLicenseKeys() {
    return toJS(this.licenseKeys);
  }

  createTableData(data=this.getLicenseKeys?.docs||[]) {
    const dataSource = cloneDeep(data)
    return dataSource.map(obj=>{
      obj["totalUsers"]=obj?.owners?.length || 0
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
  fetchLicenseKeys(options = {}) {
    this.loading = true;
    this.error = null;
    const defaultOptions={
      params:{
        sort:'-createdAt',
        limit:1000
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
    const elementsIndex = this.licenseKeys.docs.findIndex(element => element.key == key )
    this.licenseKeys.docs[elementsIndex]={...this.licenseKeys.docs[elementsIndex],...payload}
   }
}

export const licenseKeyStore = new LicenseKeyStore();
