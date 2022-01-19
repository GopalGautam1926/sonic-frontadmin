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
  getAllUsers(options = {}) {
    return AppWebRequest({
      method: "get",
      url: "/sonic-keys",
      ...options,
    });
  }
}

export default new UsersHttps();
