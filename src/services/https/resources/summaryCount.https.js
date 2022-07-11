import { AxiosRequestConfig } from "axios";
import { partnerStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class SummaryCounts {
    constructor() { }

    /**
     * Fetch all partners
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
        fetchPartnersCount(options = {}) {
            return AppWebRequest({
                method: "get",
                url: "/partners/count",
                ...options,
            });
        }
    
         fetchCompaniesCount(options = {}) {
            return AppWebRequest({
                method: "get",
                url: "/companies/count",
                ...options,
            });
        }

        fetchSonicKeysCount(options = {}) {
            return AppWebRequest({
                method: "get",
                url: "/sonic-keys/count",
                ...options,
            });
        }

        fetchPlaysCount(options = {}) {
            return AppWebRequest({
                method: "get",
                url: "/detections/count",
                ...options,
            });
        }

        fetchTracksCount(options = {}) {
            return AppWebRequest({
                method: "get",
                url: "/tracks/count",
                ...options,
            });
        }

}

export default new SummaryCounts();
