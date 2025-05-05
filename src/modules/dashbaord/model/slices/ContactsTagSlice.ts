import { createGenericSlice } from "../../../../store/GenericSlice";
import { CONTACT_TAGS_APIS } from "../apis/ContactTagsApis";

export const { slice: createContactTagSlice, thunk: createContactTags } =
  createGenericSlice("createContactTag", CONTACT_TAGS_APIS.createContactTags);

export const { slice: contactAddNotesSlice, thunk: createContactNotes } =
  createGenericSlice("createContactNotes", CONTACT_TAGS_APIS.contactAddNote);

export const { slice: deleteContactNoteSlice, thunk: deleteContactNote } =
  createGenericSlice("deleteContactNote", CONTACT_TAGS_APIS.contactNoteRemove);

export const { slice: deleteContactTagSlice, thunk: deleteContactTag } =
  createGenericSlice("deleteContactTag", CONTACT_TAGS_APIS.deleteContactTag);

export const { slice: updateTagSlice, thunk: updateTag } = createGenericSlice(
  "updateTag",
  CONTACT_TAGS_APIS.editTag
);

export const { slice: deleteTagSlice, thunk: deleteTag } = createGenericSlice(
  "deleteTag",
  CONTACT_TAGS_APIS.deleteTags
);

export const { slice: contactDetailsByTagSlice, thunk: contactDetailsByTag } =
  createGenericSlice(
    "contactDetailsByTag",
    CONTACT_TAGS_APIS.contactDetailsByTag
  );

export const { slice: getAllContactTagsSlice, thunk: getAllContactTags } =
  createGenericSlice("getAllContactTags", CONTACT_TAGS_APIS.getAllContactTags);

export const { slice: updateContactTagSlice, thunk: updateContactTag } =
  createGenericSlice("updateContactTag", CONTACT_TAGS_APIS.updateContactTags);

export const CreateContactTagReducer = createContactTagSlice.reducer;
export const ContactAddNotesReducer = contactAddNotesSlice.reducer;
export const DeleteContactNoteReducer = deleteContactNoteSlice.reducer;
export const DeleteTagReducer = deleteTagSlice.reducer;
export const UpdateTagReducer = updateTagSlice.reducer;
export const ContactDetailsByTagReducer = contactDetailsByTagSlice.reducer;
export const GetAllContactTagsReducer = getAllContactTagsSlice.reducer;
export const UpdateContactTagReducer = updateContactTagSlice.reducer;
export const DeleteContactTagReducer = deleteContactTagSlice.reducer;
