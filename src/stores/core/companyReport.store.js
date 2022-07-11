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
        partnerName: "",
        companyName: "",
        trackTitle: "",
        artist: "",
        radioStation: "",
        countries: "",
        channel: ""
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
            partnerName: "",
            companyName: "",
            trackTitle: "",
            artist: "",
            radioStation: "",
            countries: "",
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
                "name": this.filters.name ? `/${this.filters.name}/i` : undefined,
                "companyType": this.filters.companyType ? `${this.filters.companyType}` : undefined,
                "companyUrnOrId": this.filters.companyUrnOrId ? `/${this.filters.companyUrnOrId}/i` : undefined,
                "relation_owner.username": this.filters.owner || undefined,
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