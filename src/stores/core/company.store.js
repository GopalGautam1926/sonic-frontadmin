import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { log } from "../../utils/app.debug";
import companyHttps from "../../services/https/resources/company.https";
import deepmerge from "deepmerge";

class CompanyStore {
    @observable loading = false;
    @observable error = null;
    @observable company = {
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



    @observable companyTablePage = 1;

    //Pagination
    @computed
    get getCompanyTablePage() {
        return toJS(this.companyTablePage);
    }

    @action
    changeCompanyTablePage(page) {
        this.companyTablePage = page;
    }
    /* ----------------------------- */

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        name: "",
        companyType: "",
        companyUrnOrId: "",
        owner: "",
        partner: {}
    };

    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

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
            partner: {}
        }
    }
    /* ----------------------------- */

    @computed
    get getCompany() {
        return toJS(this.company);
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchCompanies(page = 1, options = {}) {
        this.error = null;
        this.loading = true;

        // let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        // let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                limit: this.company.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.company.limit : 0,
                // "createdAt>": `date(${startDate})` || undefined,
                // "createdAt<": `date(${endDate})` || undefined,
                "name": this.filters.name ? `/${this.filters.name}/i` : undefined,
                "companyType": this.filters.companyType ? `${this.filters.companyType}` : undefined,
                "companyUrnOrId": this.filters.companyUrnOrId ? `/${this.filters.companyUrnOrId}/i` : undefined,
                "relation_owner.username": this.filters.owner || undefined,
                "relation_partner._id": this.filters.partner?._id || undefined,
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
        this.company.docs.unshift(companyData)
    }

    /**
    *update company to store
    * @param {string} key
    * @param {object} payload
    */
    @action
    updateCompany(id, payload) {
        const elementsIndex = this.company.docs.findIndex(element => element._id === id)
        this.company.docs[elementsIndex] = { ...this.company.docs[elementsIndex], ...payload }
    }

    /**
    *remove company from store
    * @param {string} id
    */
    @action
    removeCompany(id) {
        this.company.docs = this.company.docs.filter(
            (cpy) => cpy?._id !== id
        );
    }
}

export const companyStore = new CompanyStore()