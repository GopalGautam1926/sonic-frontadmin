import { userStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class UsersHttps {
  constructor() { }

  /**
   * Get User Profile
   * @param {string} usernameOrSub
   * @returns
   */
  getUserProfile(usernameOrSub) {
    return AppWebRequest({
      method: "get",
      url: `/users/${usernameOrSub}/profile`,
    });
  }

  /**
   * @param {{userName:string,password:string,phoneNumber?:string,email:string,isEmailVerified?:boolean,isPhoneNumberVerified?:boolean,sendInvitationByEmail?:boolean,group?:string}} userPayload
   * @returns
   */
  adminCreateUser(userPayload) {
    return AppWebRequest({
      method: "post",
      data: userPayload,
      url: `/users/admin-create-user`,
    });
  }

  /**
* @param {{user:string,company:string}} payload
* @returns
*/
  addUserToCompany(id, payload) {
    return AppWebRequest({
      method: "post",
      data: payload,
      url: `/users/companies/add-user-to-company`,
    }).then((res) => {
      userStore.updateUser(id, res?.data);
      return res;
    });
  }

  /**
  * @param {{user:string,company:string}} payload
  * @returns
  */
  removeUserFromCompany(id, payload) {
    return AppWebRequest({
      method: "delete",
      data: payload,
      url: `/users/companies/remove-user-from-company`,
    }).then((res) => {
      userStore.updateUser(id, res?.data);
      return res;
    });
  }

  /**
  * @param {{user:string,group:string}} payload
  * @returns
  */
  addUserToGroup(payload) {
    return AppWebRequest({
      method: "post",
      data: payload,
      url: `/users/groups/add-user-to-group`,
    });
  }

  /**
  * @param {{user:string,group:string}} payload
  * @returns
  */
  removeUserFromGroup(payload) {
    return AppWebRequest({
      method: "delete",
      data: payload,
      url: `/users/groups/remove-user-from-group`,
    });
  }

  addMonitoringSubscriptionToUser(usernameOrSub) {
    return AppWebRequest({
      method: "post",
      url: `/users/add-monitoring-subscription-from-monitoring-group/${usernameOrSub}`,
    });
  }

  /**
     * Fetch all users
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
  getUsers(options = {}) {
    return AppWebRequest({
      method: "get",
      url: "/users/list-users",
      ...options,
    });
  }
}

export default new UsersHttps();
