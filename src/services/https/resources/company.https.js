import { AxiosRequestConfig } from "axios";
import { companyStore } from "../../../stores/core";
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

    /**
   * update company
   * @param {string} id
   * @param {object} payload
   * @returns
   */
    updateCompany(id, payload) {
        let newPayload = {...payload,owner:payload?.owner?._id}
        return AppWebRequest({
            method: "put",
            data: newPayload,
            url: `/companies/${id}`,
        }).then((res) => {
            companyStore.updateCompany(id, res?.data);
            return res;
        });
    }

    /**
    * get company by id
    * @param {string} id
    * @returns
    */
    findById(id) {
        return AppWebRequest({
            method: "get",
            url: `/companies/${id}`,
        })
    }

    /**
    * delete company by id
    * @param {string} id
    * @returns
    */
    deleteCompany(id) {
        return AppWebRequest({
            method: "delete",
            url: `/companies/${id}`,
        });
    }

    /**
    * Find company
    * @param {AxiosRequestConfig} name
    * @returns {Promise<any>}
    */
    findCompany(name) {
        return AppWebRequest({
            method: "get",
            url: "/companies",
            params: {
                name: `/${name}/i`
            },
        });
    }
}

export default new CompanyHttps();
