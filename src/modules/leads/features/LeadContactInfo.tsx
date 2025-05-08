import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  Box,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

// Form validation schema (same as before)
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  status: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadContactInfoProps {
  isNew: boolean;
  leadId?: string;
}

// Mock data for a lead (same as before)
const mockLead = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@acme.com",
  phone: "(555) 123-4567",
  company: "Acme Inc",
  position: "CEO",
  status: "new",
  source: "Website",
  notes: "Met at the tech conference last month. Interested in our enterprise plan.",
};

const LeadContactInfo: React.FC<LeadContactInfoProps> = ({ isNew, leadId }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { 
    control,
    handleSubmit,
    formState: { errors },
    register
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isNew ? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      status: "new",
      source: "",
      notes: "",
    } : mockLead
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success(isNew ? "Lead created successfully" : "Lead updated successfully");
    if (isNew) navigate("/leads");
  };

  return (
    <Card sx={{ 
      boxShadow: theme.card.boxShadow,
      '& .MuiCardContent-root': {
        p: 3
      }
    }}>
      <CardHeader 
        title={
          <Typography variant="h5" fontWeight={600}>
            {isNew ? "Add New Lead" : "Lead Information"}
          </Typography>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.firstName}>
                <TextField
                  label="First Name"
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.lastName}>
                <TextField
                  label="Last Name"
                  {...register('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.email}>
                <TextField
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Phone */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.phone}>
                <TextField
                  label="Phone Number"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Company */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.company}>
                <TextField
                  label="Company"
                  {...register('company')}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Position */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.position}>
                <TextField
                  label="Position"
                  {...register('position')}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                  size="small"
                />
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.status} size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={mockLead.status}
                  {...register('status')}
                  error={!!errors.status}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="contacted">Contacted</MenuItem>
                  <MenuItem value="qualified">Qualified</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                </Select>
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Source */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.source} size="small">
                <InputLabel>Source</InputLabel>
                <Select
                  label="Source"
                  defaultValue={mockLead.source}
                  {...register('source')}
                  error={!!errors.source}
                >
                  <MenuItem value="Website">Website</MenuItem>
                  <MenuItem value="Referral">Referral</MenuItem>
                  <MenuItem value="Social Media">Social Media</MenuItem>
                  <MenuItem value="Email Campaign">Email Campaign</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>{errors.source?.message}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.notes}>
                <TextField
                  label="Notes"
                  multiline
                  rows={4}
                  {...register('notes')}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', gap: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/leads')}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            {isNew ? "Create Lead" : "Update Lead"}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default LeadContactInfo;