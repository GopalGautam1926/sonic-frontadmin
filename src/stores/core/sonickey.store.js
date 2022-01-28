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
        companyName: "",
        groupName: "",
        username: "",
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
            companyName: "",
            groupName: "",
            username: "",
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
                "sonicKey": this.filters.sonickey || undefined,
                "contentOwner": this.filters.artist || undefined,
                "originalFileName": this.filters.track || undefined,
                "label": this.filters.label || undefined,
                "distributor": this.filters.distributor || undefined,
                "relation_owner.groups": this.filters.groupName || undefined,
                "relation_owner.companies": this.filters.companyName || undefined,
                "relation_owner.username": this.filters.username || undefined,
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
