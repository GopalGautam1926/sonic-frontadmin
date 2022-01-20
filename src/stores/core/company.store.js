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
    @observable company = []

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
        this.error = null;
        this.loading = true;

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
}

export const companyStore = new CompanyStore()