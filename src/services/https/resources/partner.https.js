import { partnerStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class PartnerHttps {

    /**
     * Fetch all partners
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchPartners(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/partners",
            ...options,
        });
    }

    createPartner(partnerPayload) {
        return AppWebRequest({
            method: "post",
            data: partnerPayload,
            url: "/partners",
        });
    }

    /**
   * update partner
   * @param {string} id
   * @param {object} payload
   * @returns
   */
    updatePartner(id, payload) {
        return AppWebRequest({
            method: "put",
            data: payload,
            url: `/partners/${id}`,
        }).then((res) => {
            partnerStore.updatePartner(id, res?.data);
            return res;
        });
    }

    /**
    * get partner by id
    * @param {string} id
    * @returns
    */
    findById(id) {
        return AppWebRequest({
            method: "get",
            url: `/partners/${id}`,
        })
    }

    /**
    * delete partner by id
    * @param {string} id
    * @returns
    */
    deletePartner(id) {
        return AppWebRequest({
            method: "delete",
            url: `/partners/${id}`,
        });
    }

    /**
   * Find partner
   * @param {AxiosRequestConfig} name
   * @returns {Promise<any>}
   */
    findPartner(name) {
        return AppWebRequest({
            method: "get",
            url: "/partners",
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
    changePartnerAdmin(partnerID, adminID) {
        return AppWebRequest({
            method: "put",
            url: `/partners/${partnerID}/change-partner-admin-user`,
            data: { user: adminID }
        });
    }
}

export default new PartnerHttps();
