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
import { mockContacts } from '../uiComponents/ContacstList';

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
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!isNew && contactId) {
      const foundContact = mockContacts.find(c => String(c.id) === contactId);
      if (foundContact) {
        setContact(foundContact);
      }
    }
  }, [isNew, contactId]);

  const handleInputChange = (field: keyof ContactDTO | string, value: any) => {
    if (field.includes('.')) {
      // Handle nested fields (e.g., preferences.preferredContactMethod)
      const [parent, child] = field.split('.') as [keyof ContactDTO, string];
      setContact(prev => {
        const updatedParent = {
          ...(prev[parent] as any),
          [child]: value
        };
        return {
          ...prev,
          [parent]: updatedParent
        };
      });
    } else {
      setContact(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the contact
    console.log('Saving contact:', contact);
    setIsEditing(false);
  };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {isNew ? 'New Contact Information' : 'Contact Information'}
            </Typography>
            {!isNew && (
              <Button 
                variant="contained" 
                color={isEditing ? "success" : "primary"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? "Save Changes" : "Edit Contact"}
              </Button>
            )}
          </Box>
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
                value={contact.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="John"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                id="lastName"
                value={contact.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isNew && !isEditing}
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
                value={contact.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="CEO, Manager, etc."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                id="company"
                value={contact.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                disabled={!isNew && !isEditing}
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
                value={contact.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="email@example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                id="phone"
                value={contact.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isNew && !isEditing}
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
                  value={contact.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                  disabled={!isNew && !isEditing}
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
                  value={contact.preferences.preferredContactMethod}
                  onChange={(e) => handleInputChange('preferences.preferredContactMethod', e.target.value)}
                  disabled={!isNew && !isEditing}
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
                  value={contact.preferences.preferredContactTime}
                  onChange={(e) => handleInputChange('preferences.preferredContactTime', e.target.value)}
                  disabled={!isNew && !isEditing}
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
                <InputLabel id="communicationLanguage-label">Communication Language</InputLabel>
                <Select
                  labelId="communicationLanguage-label"
                  id="communicationLanguage"
                  value={contact.preferences.communicationLanguage}
                  onChange={(e) => handleInputChange('preferences.communicationLanguage', e.target.value)}
                  disabled={!isNew && !isEditing}
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
              <FormControl fullWidth>
                <InputLabel id="doNotContact-label">Do Not Contact</InputLabel>
                <Select
                  labelId="doNotContact-label"
                  id="doNotContact"
                  value={contact.preferences.doNotContact ? 'Yes' : 'No'}
                  onChange={(e) => handleInputChange('preferences.doNotContact', e.target.value === 'Yes')}
                  disabled={!isNew && !isEditing}
                  label="Do Not Contact"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="marketingOptIn-label">Marketing Opt-In</InputLabel>
                <Select
                  labelId="marketingOptIn-label"
                  id="marketingOptIn"
                  value={contact.preferences.marketingOptIn ? 'Yes' : 'No'}
                  onChange={(e) => handleInputChange('preferences.marketingOptIn', e.target.value === 'Yes')}
                  disabled={!isNew && !isEditing}
                  label="Marketing Opt-In"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
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
                value={contact.addresses[0]?.street}
                onChange={(e) => handleInputChange('addresses.0.street', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="123 Business St, City, State, ZIP"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                id="city"
                value={contact.addresses[0]?.city}
                onChange={(e) => handleInputChange('addresses.0.city', e.target.value)}
                disabled={!isNew && !isEditing}
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
                value={contact.addresses[0]?.state}
                onChange={(e) => handleInputChange('addresses.0.state', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="State"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                id="zipCode"
                value={contact.addresses[0]?.postalCode}
                onChange={(e) => handleInputChange('addresses.0.postalCode', e.target.value)}
                disabled={!isNew && !isEditing}
                placeholder="ZIP Code"
              />
            </Grid>
          </Grid>

          <FormControl fullWidth>
            <InputLabel id="owner-label">Owner</InputLabel>
            <Select
              labelId="owner-label"
              id="owner"
              value={contact.ownerId}
              onChange={(e) => handleInputChange('ownerId', e.target.value)}
              disabled={!isNew && !isEditing}
              label="Owner"
            >
              <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
              <MenuItem value="Mark Wilson">Mark Wilson</MenuItem>
              <MenuItem value="Alex Rodriguez">Alex Rodriguez</MenuItem>
            </Select>
          </FormControl>

          {isNew || isEditing ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {!isNew && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSave}
              >
                {isNew ? 'Create Contact' : 'Save Changes'}
              </Button>
            </Box>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;