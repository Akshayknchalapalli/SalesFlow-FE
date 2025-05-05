import axios from "axios";

const USER_API_URL = ""
/* Logout api */
const signOut = () => {
  return axios({
    url: `${USER_API_URL}/Logout`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      "Cache-Control": "no-cache",
    },
  });
};

export const ADMIN_SIGNOUT_APIS = {
  signOut,
};
