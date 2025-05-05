import { createGenericSlice } from "./GenericSlice";
import { NO_ACCESS_DESIGN_PAGE_API } from "./noAccessPageApi";

export const { slice: sendEmailSlice, thunk: sendEmail } = createGenericSlice(
  "sendEmail",
  NO_ACCESS_DESIGN_PAGE_API.sendEmail
);

export const SendEmailReducer = sendEmailSlice.reducer;
