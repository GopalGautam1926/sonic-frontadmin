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
        sonickey: "",
        artist: "",
        track: "",
        label: "",
        distributor: "",
        partnerName: {},
        companyName: {},
        userName: {},
        sonickeyTablePage: 1,
    };
    @observable sonickeyTablePage = 1;

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
    get getSonicKeyTablePage() {
        return toJS(this.sonickeyTablePage);
    }

    @action
    changeSonicKeyTablePage(page) {
        this.sonickeyTablePage = page;
    }

    @computed
    get getSonicKeys() {
        return toJS(this.sonickey);
    }

    @action
    resetFilter() {
        this.filters = {
            sonickey: "",
            artist: "",
            track: "",
            label: "",
            distributor: "",
            partnerName: {},
            companyName: {},
            userName: {},
        }
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
                "sonicKey": this.filters.sonickey ? `/${this.filters.sonickey}/i` : undefined,
                "contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "originalFileName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "label": this.filters.label || undefined,
                "distributor": this.filters.distributor || undefined,
                "relation_partner._id": this.filters.partnerName?._id || undefined,
                "relation_company._id": this.filters.companyName?._id || undefined,
                "relation_filter": this.filters.userName ? { "$or": [{ "relation_owner._id": this.filters.userName?._id }, { "createdBy": this.filters.userName?._id }] } : undefined,
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
