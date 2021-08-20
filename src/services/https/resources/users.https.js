import { AppWebRequest } from "../NetworkManager";

class UsersHttps {
  constructor() {}

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
}

export default new UsersHttps();
