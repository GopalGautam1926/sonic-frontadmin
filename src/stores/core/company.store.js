import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import companyHttps from "../../services/https/resources/company.https";

class CompanyStore {
    @observable loading = false;
    @observable error = null;
    @observable company = {
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
    }

    constructor() {
        // makeObservable(this);
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
        this.loading = true;
        this.error = null;

        companyHttps.fetchCompanies(options)
            .then(({ data }) => {
                log("Company Data", data)
                this.company = data
                this.loading = false;
            })
            .catch((err) => {
                log("Company Error", err)
                this.error = err;
                this.loading = false;
            })
    }
}

export const companyStore = new CompanyStore()