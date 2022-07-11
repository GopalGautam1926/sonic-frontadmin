import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import CompanyReportsHttps from "../../services/https/resources/companyReport.https";
import moment from "moment";

class CompanyReportStore {
    @observable loading = false;
    @observable error = null;
    @observable companyReport = {
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
    }

    constructor() {
        // makeObservable(this);
    }

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        partner: {},
        company: {},
        track: "",
        artist: "",
        radioStation: "",
        country: "",
        channel: "ALL"
    };

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    //User Filters
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
            partner: {},
            company: {},
            track: "",
            artist: "",
            radioStation: "",
            country: "",
            channel: ""
        }
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchCompaniesReports(page = 1) {
        this.error = null;
        this.loading = true;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let options = {
            params: {
                limit: this?.companyReport?.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this?.companyReport?.limit : 0,
                sort: "-createdAt",
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "relation_sonicKey.partner._id": this?.filters?.partner?._id || undefined,
                "relation_sonicKey.company._id": this?.filters?.company?._id || undefined,
                "relation_sonicKey.originalFileName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "relation_sonicKey.contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "relation_radioStation.name": this.filters.radioStation ? `/${this.filters.radioStation}/i` : undefined,
                "relation_country.name": this.filters.country ? `/${this.filters.country}/i` : undefined,
                "channel": this.filters.channel !== "ALL" ? this.filters.channel : undefined,
            }
        }

        CompanyReportsHttps.fetchCompaniesReports(options)
            .then(({ data }) => {
                log("Fetched Company Report", data)
                this.companyReport = data
                this.loading = false;
            })
            .catch((err) => {
                log("Fetched Company Report Error", err)
                this.error = err;
                this.loading = false;
            })
    }

    @action
    updateCompany(company = {}) {
        let objIndex = this.companyReport.docs?.findIndex(obj => obj?._id === company?._id)
        this.companyReport.docs[objIndex] = company
        log("Changed company", company)
    }
}

export const companyReportStore = new CompanyReportStore()