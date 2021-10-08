import {
    observable,
    action,
    computed,
    toJS,
    autorun,
    reaction,
    // makeObservable,
    when,
    observe,
  } from "mobx";
  import { AxiosRequestConfig } from "axios";
  import { log } from "../../utils/app.debug";
  import radiostationHttps from "../../services/https/resources/radiostation.https";
  import deepmerge from 'deepmerge'
  
  class RadioStationStore {
    @observable loading = false;
    @observable error = null;
    @observable radioStations = {
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
    get getRadioStations() {
      return toJS(this.radioStations);
    }
  
    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchRadioStations(options = {}) {
      this.loading = true;
      this.error = null;
      const defaultOptions={
        params:{
          sort:'-createdAt',
          limit:1000
        },
      }
      options=deepmerge(defaultOptions,options)
      radiostationHttps
        .fetchRadioStations(options)
        .then(({ data }) => {
          log("radioStations", data);
          this.radioStations = data;
          this.loading = false;
        })
        .catch((err) => {
          log("radioStations err", err);
          this.loading = false;
          this.error = err;
        });
    }
  
    /**
     *add radio station to store
     * @param {object} radioStation
     */
    @action
    addRadioStation(radioStation) {
      this.radioStations.docs.unshift(radioStation);
      this.radioStations.totalDocs += 1;
    }
    /**
     *remove radio station from store
     * @param {string} id
     */
    @action
    removeRadioStation(id) {
      this.radioStations.docs = this.radioStations.docs.filter(
        (api) => api?._id !== id
      );
      this.radioStations.totalDocs -= 1;
    }
  
    /**
     *update radio station to store
     * @param {string} id
     * @param {object} payload
     */
     @action
     updateRadioStation(id,payload) {
      const elementsIndex = this.radioStations.docs.findIndex(element => element._id == id )
      this.radioStations.docs[elementsIndex]={...this.radioStations.docs[elementsIndex],...payload}
     }

      /**
     *play radio station from store
     * @param {string} id
     */
    @action
    playRadioStation(id) {
      this.radioStations.docs = this.radioStations.docs.filter(
        (api) => api?._id !== id
      );
      this.radioStations.totalDocs -= 1;
    }
  }
  
  export const radioStationStore = new RadioStationStore();
  