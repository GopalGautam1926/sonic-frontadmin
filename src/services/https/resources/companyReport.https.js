import { AppWebRequest } from "../NetworkManager";

class CompanyReportsHttps {

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
