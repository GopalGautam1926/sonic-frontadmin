import { AxiosRequestConfig } from "axios";
import { companyStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class CompanyReportsHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchCompaniesReports(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/companies/reports/get-encodes-by-companies",
            ...options,
        });
    }
}

export default new CompanyReportsHttps();
