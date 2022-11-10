import { AppWebRequest } from "../NetworkManager";

class ReportsHttps {

    /**
     * Fetch all sonickeys detected plays
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchPlays(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/detections/list-plays",
            ...options,
        });
    }

    /**
     * 
     * @param {string} playId 
     * @returns {Promise<any>}
     */
    deletePlay(playId) {
        return AppWebRequest({
            method: "delete",
            url: `/detections/${playId}`,
        });
    }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchSonicKeys(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/sonic-keys",
            ...options,
        });
    }

    /**
     * Export plays reports
     * * @param {AxiosRequestConfig} options
     * * @param {string} format
     * * @returns {Promise<any>}
     */
    exportPlays(format, options) {
        return AppWebRequest({
            method: "get",
            url: `/detections/export-plays-by/${format}`,
            responseType: "blob",
            ...options,
        });
    }

    /**
     * Export encodes reports
     * * @param {AxiosRequestConfig} options
     * * @param {string} format
     * * @returns {Promise<any>}
     */
    exportSonicKeys(format, options) {
        return AppWebRequest({
            method: "get",
            url: `/sonic-keys/export-sonickeys/${format}`,
            responseType: "blob",
            ...options,
        });
    }
}

export default new ReportsHttps();
