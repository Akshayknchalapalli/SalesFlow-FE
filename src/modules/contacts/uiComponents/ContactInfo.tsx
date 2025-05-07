import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

interface ContactInfoProps {
  isNew: boolean;
  contactId?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isNew, contactId }) => {
  const contactData = {
    fullName: 'Emma Wilson',
    title: 'Marketing Director',
    company: 'Acme Corp',
    email: 'emma.wilson@acme.com',
    phone: '(555) 234-5678',
    stage: 'customer',
    address: '123 Business Ave, New York, NY 10001',
    owner: 'Sarah Johnson',
  };

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
                label="Full Name"
                id="fullName"
                defaultValue={!isNew ? contactData.fullName : ''}
                placeholder="John Doe"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title/Role"
                id="title"
                defaultValue={!isNew ? contactData.title : ''}
                placeholder="CEO, Manager, etc."
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                id="company"
                defaultValue={!isNew ? contactData.company : ''}
                placeholder="Company Ltd."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="email"
                defaultValue={!isNew ? contactData.email : ''}
                placeholder="email@example.com"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                id="phone"
                defaultValue={!isNew ? contactData.phone : ''}
                placeholder="(123) 456-7890"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="stage-label">Relationship Stage</InputLabel>
                <Select
                  labelId="stage-label"
                  id="stage"
                  defaultValue={!isNew ? contactData.stage : 'prospect'}
                  label="Relationship Stage"
                >
                  <MenuItem value="prospect">Prospect</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Address"
            id="address"
            defaultValue={!isNew ? contactData.address : ''}
            placeholder="123 Business St, City, State, ZIP"
          />

          <FormControl fullWidth>
            <InputLabel id="owner-label">Owner</InputLabel>
            <Select
              labelId="owner-label"
              id="owner"
              defaultValue={!isNew ? contactData.owner : ''}
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