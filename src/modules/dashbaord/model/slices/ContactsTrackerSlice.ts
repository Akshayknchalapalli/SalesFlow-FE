import { createGenericSlice } from "../../../../store/GenericSlice";
import { CONTACTS_TRACKER_APIS } from "../apis/ContactsTrackerApis";

export const {
  slice: getAllContactsTrackerSlice,
  thunk: getAllContactsTracker,
} = createGenericSlice(
  "getAllContactsTracker",
  CONTACTS_TRACKER_APIS.getAllContactsImportTracker
);

export const GetAllContactsTrackerReducer = getAllContactsTrackerSlice.reducer;
