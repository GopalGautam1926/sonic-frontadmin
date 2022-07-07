import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import CompanyReportsHttps from "../../services/https/resources/companyReport.https";
import deepmerge from "deepmerge";

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
        name: "",
        companyType: "",
        companyUrnOrId: "",
        owner: "",
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
            name: "",
            companyType: "",
            companyUrnOrId: "",
            owner: "",
        }
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchCompaniesReports(options = {}) {
        this.error = null;
        this.loading = true;

        // let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        // let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                // "createdAt>": `date(${startDate})` || undefined,
                // "createdAt<": `date(${endDate})` || undefined,
                "name": this.filters.name ? `/${this.filters.name}/i` : undefined,
                "companyType": this.filters.companyType ? `${this.filters.companyType}` : undefined,
                "companyUrnOrId": this.filters.companyUrnOrId ? `/${this.filters.companyUrnOrId}/i` : undefined,
                "relation_owner.username": this.filters.owner || undefined,
            }
        }

        options = deepmerge(newOptions, options)
        CompanyReportsHttps.fetchCompaniesReports(options)
            .then(({ data }) => {
                log("Fetched Company report", data)
                this.company = data
                this.loading = false;
            })
            .catch((err) => {
                log("Fetched Company Report Error", err)
                this.error = err;
                this.loading = false;
            })
    }
}

export const companyReportStore = new CompanyReportStore()