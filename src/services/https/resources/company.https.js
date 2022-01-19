import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class CompanyHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchCompanies(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/companies",
            ...options,
        });
    }

    createCompany(companyPayload, options = {}) {
        return AppWebRequest({
            method: "post",
            data: companyPayload,
            url: "/companies",
            ...options,
        });
    }
}

export default new CompanyHttps();
