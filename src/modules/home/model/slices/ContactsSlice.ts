import { createGenericSlice } from "../../../../store/GenericSlice";
import { CONTACTS_APIS } from "../apis/ContactsApis";

export const { slice: getAllContactsSlice, thunk: getAllContacts } =
  createGenericSlice("getAllContacts", CONTACTS_APIS.getAllContacts);

export const { slice: createContactSlice, thunk: createContact } =
  createGenericSlice("createContact", CONTACTS_APIS.createContact);

export const { slice: updateContactSlice, thunk: updateContact } =
  createGenericSlice("updateContact", CONTACTS_APIS.updateContact);

export const { slice: deleteContactSlice, thunk: deleteContact } =
  createGenericSlice("deleteContact", CONTACTS_APIS.deleteContacts);

export const { slice: getDeletedContactsSlice, thunk: getDeletedContacts } =
  createGenericSlice("getDeletedContacts", CONTACTS_APIS.getAllDeletedContacts);

export const { slice: getImportContactsSlice, thunk: getImportContacts } =
  createGenericSlice("getImportContacts", CONTACTS_APIS.importContacts);

export const {
  slice: getAllRestoredContactsSlice,
  thunk: getAllRestoredContacts,
} = createGenericSlice(
  "getAllRestoredContacts",
  CONTACTS_APIS.getAllRestoredContacts
);

export const GetAllContactsReducer = getAllContactsSlice.reducer;
export const CreateContactReducer = createContactSlice.reducer;
export const UpdateContactReducer = updateContactSlice.reducer;
export const DeleteContactReducer = deleteContactSlice.reducer;
export const GetDeletedContactsReducer = getDeletedContactsSlice.reducer;
export const GetImportContactsReducer = getImportContactsSlice.reducer;
export const GetAllRestoredContactsReducer =
  getAllRestoredContactsSlice.reducer;
