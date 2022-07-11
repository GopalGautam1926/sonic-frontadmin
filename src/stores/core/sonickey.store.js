import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import moment from "moment";
import sonickeysHttps from "../../services/https/resources/sonickeys.https";

class SonicKeyStore {
    @observable loading = false;
    @observable error = null;
    @observable sonickey = {
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
        partnerName: {},
        companyName: {},
        track: "",
        artist: "",
        country: "",
        radiostation: "",
        channel: "ALL",
        // sonickey: "",
        // label: "",
        // distributor: "",
        sonickeyTablePage: 1,
    };
    @observable sonickeyTablePage = 1;

    constructor() { }

    //DATE RANGE
    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    //FILTERS
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
            partnerName: {},
            companyName: {},
            track: "",
            artist: "",
            country: "",
            radiostation: "",
            channel: "ALL",
        }
    }

    //PAGINATION
    @computed
    get getSonicKeyTablePage() {
        return toJS(this.sonickeyTablePage);
    }

    @action
    changeSonicKeyTablePage(page) {
        this.sonickeyTablePage = page;
    }

    //FETCH SONICKEYS
    @computed
    get getSonicKeys() {
        return toJS(this.sonickey);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchSonicKeys(page = 1) {
        this.loading = true;
        this.error = null;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        const options = {
            params: {
                limit: this.sonickey.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.sonickey.limit : 0,
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "relation_partner._id": this.filters.partnerName?._id || undefined,
                "relation_company._id": this.filters.companyName?._id || undefined,
                "contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "track": this.filters.track || undefined,
                channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "relation_radioStation.country": this.filters.country || undefined,
                "relation_radioStation.name": this.filters.radiostation || undefined,
                // "sonicKey": this.filters.sonickey ? `/${this.filters.sonickey}/i` : undefined,
                // "label": this.filters.label || undefined,
                // "distributor": this.filters.distributor || undefined,
            },
        }

        sonickeysHttps
            .fetchSonicKeys(options)
            .then(({ data }) => {
                log("Sonickey", data);
                this.sonickey = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Sonickey err", err);
                this.loading = false;
                this.error = err;
            });
    }
}

export const sonicKeyStore = new SonicKeyStore();
