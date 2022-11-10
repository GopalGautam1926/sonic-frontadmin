import { companyStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class CompanyHttps {

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
        // let newPayload = {...payload,owner:payload?.owner?._id}
        delete payload?.owner
        delete payload?.partner
        return AppWebRequest({
            method: "put",
            data: payload,
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

    /**
 * Fetch all sonickeys
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */
    changeCompanyAdmin(companyID, adminID) {
        return AppWebRequest({
            method: "put",
            url: `/companies/${companyID}/change-company-admin-user`,
            data: { user: adminID }
        });
    }
}

export default new CompanyHttps();
