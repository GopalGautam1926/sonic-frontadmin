import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import companyHttps from "../../services/https/resources/company.https";
import deepmerge from "deepmerge";
import moment from "moment";

class CompanyStore {
    @observable loading = false;
    @observable error = null;
    @observable company = []

    constructor() {
        // makeObservable(this);
    }

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        company: "",
        owner: "",
        email: "",
        phone: "",
    };

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

    @action
    resetFilter() {
        this.filters = {
            company: "",
            owner: "",
            email: "",
            phone: "",
        }
    }

    @computed
    get getCompany() {
        return toJS(this.company);
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchCompanies(options = {}) {
        this.error = null;
        this.loading = true;

        // let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        // let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                // "createdAt>": `date(${startDate})` || undefined,
                // "createdAt<": `date(${endDate})` || undefined,
                // "name": this.filters.company || undefined,
                // "email": this.filters.email || undefined,
                // "contactNo": this.filters.phone || undefined,
                // "relation_owner.username": this.filters.owner || undefined,
            }
        }

        options = deepmerge(newOptions, options)

        companyHttps.fetchCompanies(options)
            .then(({ data }) => {
                log("Fetched Company Data", data)
                this.company = data
                this.loading = false;
            })
            .catch((err) => {
                log("Fetched Company Error", err)
                this.error = err;
                this.loading = false;
            })
    }

    @action
    addCompany(companyData) {
        this.company.push(companyData)
    }

    /**
    *update company to store
    * @param {string} key
    * @param {object} payload
    */
    @action
    updateCompany(id, payload) {
        const elementsIndex = this.company.findIndex(element => element._id == id)
        this.company[elementsIndex] = { ...this.company[elementsIndex], ...payload }
    }

    /**
    *remove company from store
    * @param {string} id
    */
    @action
    removeLicenseKey(id) {
        this.company = this.company.filter(
            (cpy) => cpy?._id !== id
        );
    }
}

export const companyStore = new CompanyStore()