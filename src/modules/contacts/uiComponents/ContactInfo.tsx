import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import Grid from "@mui/material/GridLegacy";
import type { ContactDTO, AddressDTO, ContactPreferencesDTO, SocialProfileDTO } from '../ContactDTO';

interface ContactInfoProps {
  isNew: boolean;
  contactId?: string;
}

const defaultContact: ContactDTO = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  jobTitle: '',
  stage: 'prospect',
  ownerId: '',
  preferences: {
    preferredContactMethod: '',
    preferredContactTime: '',
    doNotContact: false,
    marketingOptIn: false,
    communicationLanguage: '',
  },
  addresses: [],
  socialProfiles: [],
  notes: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  updatedBy: '',
  version: 1,
};

const ContactInfo: React.FC<ContactInfoProps> = ({ isNew, contactId }: ContactInfoProps) => {
  const [contact, setContact] = React.useState<ContactDTO>(defaultContact);

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h6">
            {isNew ? 'New Contact Information' : 'Contact Information'}
          </Typography>
        }
      />
      <CardContent>
        <Box component="form" sx={{ display: 'grid', gap: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                id="firstName"
                defaultValue={!isNew ? contact.firstName : ''}
                placeholder="John"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                id="lastName"
                defaultValue={!isNew ? contact.lastName : ''}
                placeholder="Doe"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title/Role"
                id="title"
                defaultValue={!isNew ? contact.jobTitle : ''}
                placeholder="CEO, Manager, etc."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                id="company"
                defaultValue={!isNew ? contact.companyName : ''}
                placeholder="Company Ltd."
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="email"
                defaultValue={!isNew ? contact.email : ''}
                placeholder="email@example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                id="phone"
                defaultValue={!isNew ? contact.phone : ''}
                placeholder="(123) 456-7890"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="stage-label">Relationship Stage</InputLabel>
                <Select
                  labelId="stage-label"
                  id="stage"
                  defaultValue={!isNew ? contact.stage : 'prospect'}
                  label="Relationship Stage"
                >
                  <MenuItem value="prospect">Prospect</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="preferredContactMethod-label">Preferred Contact Method</InputLabel>
                <Select
                  labelId="preferredContactMethod-label"
                  id="preferredContactMethod"
                  defaultValue={!isNew ? contact.preferences.preferredContactMethod : ''}
                  label="Preferred Contact Method"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="in-person">In-Person</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="preferredContactTime-label">Preferred Contact Time</InputLabel>
                <Select
                  labelId="preferredContactTime-label"
                  id="preferredContactTime"
                  defaultValue={!isNew ? contact.preferences.preferredContactTime : ''}
                  label="Preferred Contact Time"
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="doNotContact-label">Do Not Contact</InputLabel>
                <Select
                  labelId="doNotContact-label"
                  id="doNotContact"
                  defaultValue={!isNew ? contact.preferences.doNotContact ? 'Yes' : 'No' : 'No'}
                  label="Do Not Contact"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="marketingOptIn-label">Marketing Opt-In</InputLabel>
                <Select
                  labelId="marketingOptIn-label"
                  id="marketingOptIn"
                  defaultValue={!isNew ? contact.preferences.marketingOptIn ? 'Yes' : 'No' : 'No'}
                  label="Marketing Opt-In"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="communicationLanguage-label">Communication Language</InputLabel>
                <Select
                  labelId="communicationLanguage-label"
                  id="communicationLanguage"
                  defaultValue={!isNew ? contact.preferences.communicationLanguage : ''}
                  label="Communication Language"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                id="address"
                defaultValue={!isNew ? contact.addresses[0]?.street : ''}
                placeholder="123 Business St, City, State, ZIP"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                id="city"
                defaultValue={!isNew ? contact.addresses[0]?.city : ''}
                placeholder="City"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="State"
                id="state"
                defaultValue={!isNew ? contact.addresses[0]?.state : ''}
                placeholder="State"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                id="zipCode"
                defaultValue={!isNew ? contact.addresses[0]?.postalCode : ''}
                placeholder="ZIP Code"
              />
            </Grid>
          </Grid>

          <FormControl fullWidth>
            <InputLabel id="owner-label">Owner</InputLabel>
            <Select
              labelId="owner-label"
              id="owner"
              defaultValue={!isNew ? contact.ownerId : ''}
              label="Owner"
            >
              <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
              <MenuItem value="Mark Wilson">Mark Wilson</MenuItem>
              <MenuItem value="Alex Rodriguez">Alex Rodriguez</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button type="submit" variant="contained" size="large">
              {isNew ? 'Create Contact' : 'Update Contact'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;