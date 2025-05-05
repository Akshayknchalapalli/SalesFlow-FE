import axios from "axios";

const CONTACTS_TRACKER_API_URL = "";

const getAllContactsImportTracker = (data: any) => {
  return axios({
    url: `${CONTACTS_TRACKER_API_URL}/GetAllContactsImportTracker?businessId=${data?.businessId}&pageNumber=${data?.pageNumber}&pageSize=${data?.pageSize}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const CONTACTS_TRACKER_APIS = {
  getAllContactsImportTracker,
};
