export interface AddressDTO {
  type: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  primary: boolean;
}

export interface ContactPreferencesDTO {
  preferredContactMethod: string;
  preferredContactTime: string;
  doNotContact: boolean;
  marketingOptIn: boolean;
  communicationLanguage: string;
}

export interface SocialProfileDTO {
  platform: string;
  profileUrl: string;
  username: string;
  verified: boolean;
}

export type ContactStage = 'prospect' | 'customer' | 'partner';

export interface ContactDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  stage: ContactStage;
  ownerId: string;
  preferences: ContactPreferencesDTO;
  addresses: AddressDTO[];
  socialProfiles: SocialProfileDTO[];
  notes: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  createdBy: string;
  updatedBy: string;
  version: number;
} 