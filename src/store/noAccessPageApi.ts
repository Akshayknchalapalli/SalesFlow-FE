import axios from "axios";

const NO_ACCESS_DESIGN_PAGE_API_URL = ""

const sendEmail = (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    if (Array.isArray(value) && value.length) {
      value.forEach((v: any) => {
        formData.append(key, v);
      });
    } else {
      formData.append(key, value);
    }
  });
  return axios({
    url: `${NO_ACCESS_DESIGN_PAGE_API_URL}/api/v1/utility/sendemail/form`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export const NO_ACCESS_DESIGN_PAGE_API = { sendEmail };
