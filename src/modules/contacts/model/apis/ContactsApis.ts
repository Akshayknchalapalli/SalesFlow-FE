import axios from "axios";

const CONTACTS_API_URL = "";

const getAllContacts = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactsDetails?BusinessId=${data?.businessId}&UserId=${data?.userId}&page=${data?.page}&per_page=${data?.per_page}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: data?.data,
  });
};

const createContact = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactAdd?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: data?.data,
  });
};

const fetchContactDetailsById = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactDetails?ContactId=${data.contactId}&BusinessId=${data?.businessId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const deleteContacts = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactsRemove?BusinessId=${data?.BusinessId}&UserId=${data?.userId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      contactIds: data?.data,
    },
  });
};

const getAllDeletedContacts = (data: any) => {
  const { businessId, userId, search } = data;

  const url =
    `${CONTACTS_API_URL}/GetDeletedContact?businessId=${businessId}&UserId=${userId}` +
    (search ? `&search=${encodeURIComponent(search)}` : "");

  return axios({
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const getAllRestoredContacts = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/RestoreContacts?businessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      contactIds: data.contactIds,
    },
  });
};

const updateContact = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactEdit?BusinessId=${data?.businessId}&UserId=${data?.userId}&ContactId=${data?.contactId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: data?.data,
  });
};

const importContacts = (data: any) => {
  const formData = new FormData();
  formData.append("File", data?.data);
  return axios({
    url: `${CONTACTS_API_URL}/ContactsImport?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("token"),
    },
    data: formData,
  });
};

const exportContacts = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactsExport?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    responseType: "blob",
  });
};

const exportContactsById = (data: any) => {
  return axios({
    url: `${CONTACTS_API_URL}/ContactsExportById?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    responseType: "blob",
    data: {
      contactIds: data?.contactId,
    },
  });
};

export const CONTACTS_APIS = {
  getAllContacts,
  createContact,
  fetchContactDetailsById,
  deleteContacts,
  updateContact,
  importContacts,
  exportContacts,
  exportContactsById,
  getAllDeletedContacts,
  getAllRestoredContacts,
};
