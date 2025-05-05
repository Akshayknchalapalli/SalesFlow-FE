import axios from "axios";

const CONTACTS_TAG_API_URL = "";

const createContactTags = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagsCreate?BusinessId=${data?.BusinessId}&UserId=${data?.UserId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      tag: data?.data,
    },
  });
};

const getAllContactTags = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagsDetails?&BusinessId=${data?.businessId}&UserId=${data?.userId}&search=${data?.search}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const updateContactTags = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagsUpdate?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      tagIds: data?.tagIds,
      contactIds: data?.contactIds,
    },
  });
};

const deleteContactTag = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagsRemove?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      tag: data?.tag,
      contactIds: data?.contactIds,
    },
  });
};

const contactDetailsByTag = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactsDetailsByTag?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: { tagIds: data?.tagIds },
  });
};

const contactAddNote = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/contactNoteAdd?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      contactId: data?.contactId,
      note: data?.note,
    },
  });
};

const contactNoteRemove = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/contactNoteRemove?BusinessId=${data?.businessId}&UserId=${data?.userId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: {
      contactId: data?.contactId,
      note: data?.note,
    },
  });
};

const deleteTags = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagsDelete?BusinessId=${data?.businessId}&UserId=${data?.userId}&TagId=${data?.tagIds}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
};

const editTag = (data: any) => {
  return axios({
    url: `${CONTACTS_TAG_API_URL}/ContactTagEdit?BusinessId=${data?.BusinessId}&UserId=${data?.UserId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: data?.data,
  });
};

export const CONTACT_TAGS_APIS = {
  createContactTags,
  getAllContactTags,
  updateContactTags,
  deleteContactTag,
  contactDetailsByTag,
  contactAddNote,
  contactNoteRemove,
  deleteTags,
  editTag,
};
