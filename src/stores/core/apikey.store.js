import {
  observable,
  action,
  computed,
  toJS
} from "mobx";

import { log } from "../../utils/app.debug";
import apikeysHttps from "../../services/https/resources/apikeys.https";
import deepmerge from 'deepmerge'

class ApiKeyStore {
  @observable loading = false;
  @observable error = null;
  @observable apiKeys = {
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


  @observable apiKeyTablePage = 1;

  //Pagination
  @computed
  get getApiKeyTablePage() {
      return toJS(this.apiKeyTablePage);
  }

  @action
  changeApiKeyTablePage(page) {
      this.apiKeyTablePage = page;
  }
  /* ----------------------------- */

  @computed
  get getApiKeys() {
    return toJS(this.apiKeys);
  }

  /**
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  @action
  fetchApiKeys(page = 1, options = {}) {
    this.loading = true;
    this.error = null;
    const defaultOptions={
      params:{
        sort:'-createdAt',
        limit: this.apiKeys.limit,
        page: page,
        skip: page > 1 ? (page - 1) * this.apiKeys.limit : 0,
      },
    }
    options=deepmerge(defaultOptions,options)
    apikeysHttps
      .fetchApiKeys(options)
      .then(({ data }) => {
        log("apiKeys", data);
        this.apiKeys = data;
        this.loading = false;
      })
      .catch((err) => {
        log("apiKeys err", err);
        this.loading = false;
        this.error = err;
      });
  }

  /**
   *add key to store
   * @param {object} apiKey
   */
  @action
  addApiKey(apiKey) {
    this.apiKeys.docs.unshift(apiKey);
    this.apiKeys.totalDocs += 1;
  }
  /**
   *add key to store
   * @param {string} key
   */
  @action
  removeApiKey(key) {
    this.apiKeys.docs = this.apiKeys.docs.filter(
      (api) => api?._id !== key
    );
    this.apiKeys.totalDocs -= 1;
  }

  /**
   *update key to store
   * @param {string} key
   * @param {object} payload
   */
   @action
   updateApiKey(key,payload) {
    const elementsIndex = this.apiKeys.docs.findIndex(element => element._id === key )
    this.apiKeys.docs[elementsIndex]={...this.apiKeys.docs[elementsIndex],...payload}
   }
}

export const apiKeyStore = new ApiKeyStore();
