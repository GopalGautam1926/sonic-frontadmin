import { userStore } from "../../../stores/core";
import { AppWebRequest } from "../NetworkManager";

class UsersHttps {
  constructor() { }

  /**
   * Get Admin Profile
   * @returns
   */
  getAdminProfile(jwtToken) {
    const config = {
      headers: { Authorization: `Bearer ${jwtToken}` }
    };
    return AppWebRequest({
      method: "get",
      url: `/users/@me`,
      ...config,
    });
  }

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
      url: `/users`,
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
      url: "/users",
      ...options,
    });
  }

  /**
    * get user by id
    * @param {string} id
    * @returns
    */
  findById(id) {
    return AppWebRequest({
      method: "get",
      url: `/users/${id}`,
    })
  }

  findUser(username) {
    return AppWebRequest({
      method: "get",
      url: "/users",
      params: {
        username: `/${username}/i`
      },
    });
  }
}

export default new UsersHttps();
