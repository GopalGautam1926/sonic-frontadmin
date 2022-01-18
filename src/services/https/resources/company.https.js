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
            // url: "/sonic-keys",
            ...options,
        });
    }
}

export default new CompanyHttps();
