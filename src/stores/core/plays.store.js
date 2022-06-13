import { observable, action, computed, toJS } from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import sonickeysHttps from "../../services/https/resources/sonickeys.https";
import moment from "moment";

class PlaysStore {
  @observable loading = false;
  @observable error = null;
  @observable plays = {
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
  @observable dateRange = {
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  };
  @observable filters = {
    channel: "ALL",
    sonickey: "",
    country: "",
    radiostation: "",
    artist: "",
    track: "",
    label: "",
    distributor: "",
    partnerName: {},
    companyName: {},
    userName: {},
    startEncodedDate: "",
    endEncodedDate: "",
    playTablePage: 1,
  };
  @observable playTablePage = 1;

  constructor() {
    // makeObservable(this);
  }

  @computed
  get getDateRange() {
    return toJS(this.dateRange);
  }

  @action
  changeDateRange(dateRange) {
    this.dateRange = dateRange;
  }

  @computed
  get getFilters() {
    return toJS(this.filters);
  }

  @action
  changeFilters(filters) {
    this.filters = filters;
  }

  @computed
  get getPlayTablePage() {
    return toJS(this.playTablePage);
  }

  @action
  changePlayTablePage(page) {
    this.playTablePage = page;
  }

  @computed
  get getPlays() {
    return toJS(this.plays);
  }

  @action
  resetFilter() {
    this.filters = {
      channel: "ALL",
      sonickey: "",
      country: "",
      radiostation: "",
      artist: "",
      track: "",
      label: "",
      distributor: "",
      partnerName: {},
      companyName: {},
      userName: {},
      startEncodedDate: "",
      endEncodedDate: "",
    };
  }

  /**
   *delete play from store
   * @param {string} playId
   */
  async deletePlay(playId) {
    return sonickeysHttps.deletePlay(playId).then(({ data }) => {
      this.plays.docs = this.plays.docs.filter((ply) => ply?._id !== playId);
      this.plays.totalDocs -= 1;
      return data;
    });
    // return new Promise(resolve => setTimeout(() => {
    //     this.plays.docs = this.plays.docs.filter((ply) => ply?._id !== playId);
    //     this.plays.totalDocs -= 1;
    //     resolve(playId);
    //   }, 3000));
  }

  /**
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  @action
  fetchPlays(page = 1) {
    this.loading = true;
    this.error = null;

    let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
    let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

    let startOfEncodedDate = moment(this.filters.startEncodedDate).startOf("days").toISOString();
    let startEndOfEncodedDate = moment(this.filters.startEncodedDate).endOf("days").toISOString();
    let endOfEncodedDate = moment(this.filters.endEncodedDate).endOf("days").toISOString();

    const options = {
      params: {
        limit: this.plays.limit,
        page: page,
        skip: page > 1 ? (page - 1) * this.plays.limit : 0,
        "detectedAt>": this.dateRange.startDate ? `date(${startDate})` : undefined,
        "detectedAt<": this.dateRange.endDate ? `date(${endDate})` : undefined,
        channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
        "relation_sonicKey.sonicKey": this.filters.sonickey ? `/${this.filters.sonickey}/i` : undefined,
        "relation_radioStation.country": this.filters.country || undefined,
        "relation_radioStation.name": this.filters.radiostation || undefined,
        "relation_sonicKey.contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
        "relation_sonicKey.originalFileName": this.filters.track ? `/${this.filters.track}/i` : undefined,
        "relation_sonicKey.label": this.filters.label || undefined,
        "relation_sonicKey.distributor": this.filters.distributor || undefined,
        "relation_filter": this.filters.userName ? { "$or": [{ "relation_sonicKey.owner._id": this.filters.userName?._id }, { "createdBy": this.filters.userName?._id }] } : undefined,
        "relation_sonicKey.partner._id": this.filters.partnerName?._id || undefined,
        "relation_sonicKey.company._id": this.filters.companyName?._id || undefined,
        "relation_sonicKey.createdAt>": this.filters.startEncodedDate ? `date(${startOfEncodedDate})` : undefined,
        "relation_sonicKey.createdAt<": this.filters.endEncodedDate ? `date(${endOfEncodedDate})` : this.filters.startEncodedDate ? `date(${startEndOfEncodedDate})` : undefined,
      },
    };

    sonickeysHttps
      .fetchPlays(options)
      .then(({ data }) => {
        log("Plays", data);
        this.plays = data;
        this.loading = false;
      })
      .catch((err) => {
        log("Plays err", err);
        this.loading = false;
        this.error = err;
      });
  }
}

export const playsStore = new PlaysStore();
