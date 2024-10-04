import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// This page would be for user's current info
const CurrentInfo = () => {
  // Will need a form with inputs for users info
  // Like any changes to address, email, or contacts

  interface UserInfo {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [contact1, setContact1] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    relationship: "",
  });

  const inputStyle = {
    // paddingY: 1,
  };

  // *** TODO: Figure out why I cannot type into all input boxes and fix it ***
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
        // firstName: value,
        // lastName: value,
        // streetAddress: value,
        // [city]: e.target.value,
        // [state]: e.target.value,
        // [zipCode]: e.target.value,
        // [phone]: e.target.value,
        // [email]: e.target.value,
    }))
  }

  // Retrieve user's current info
  const getCurrentInfo = async () => {
    // Make call out to back end to retrieve user's data

  };

  // submit new update if no existing info
  const handleSubmit = () => {
    // Check if existing info, then do a PUT call
    // If no existing info, then do a POST call
  };

  useEffect(() => {

  },[])

  return (
    <Box p={4} sx={{ backgroundColor: "#cce4ec" }}>
      <Typography variant="h2">Current Details</Typography>
      <hr />
      {/* <Card> */}
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <Card sx={{ px: 4, py: 2, my: 3 }}>
          <Typography variant="h5">Personal Information</Typography>
          <Grid container p={2}>
            {/* <FormGroup sx={{ py: 1, }}> */}
            <Grid size={3} pb={3}>
              <Typography>First Name</Typography>
              <TextField
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Last Name</Typography>
              <TextField
                type="text"
                name="lastName"
                value={userInfo.lastName}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Street Address</Typography>
              <TextField
                type="text"
                name="streetAddress"
                value={userInfo.streetAddress}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>City</Typography>
              <TextField

                value={userInfo.city}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>State</Typography>
              <TextField
 
                value={userInfo.state}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Zip Code</Typography>
              <TextField

                value={userInfo.zipCode}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Email</Typography>
              <TextField
  
                value={userInfo.email}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Phone</Typography>
              <TextField

                value={userInfo.phone}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            {/* </FormGroup> */}
          </Grid>
        </Card>
        {/* Contact Details */}
        <Card sx={{ px: 4, py: 2, my: 3 }}>
          <Typography variant="h5">Emergency Contact 1</Typography>
          <Grid container p={2}>
            {/* <FormGroup sx={{ py: 1, }}> */}
            <Grid size={3}>
              <Typography>First Name</Typography>
              <TextField

                value={contact1.firstName}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Last Name</Typography>
              <TextField

                value={contact1.lastName}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Phone Number</Typography>
              <TextField
    
                value={contact1.phone}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Relationship</Typography>
              <TextField
  
                value={contact1.relationship}
                size="small"
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ px: 4, py: 2, mb: 2 }}>
          <Typography variant="h5">Emergency Contact 2</Typography>
          <Grid container p={2}>
            {/* <FormGroup sx={{ py: 1, }}> */}
            <Grid size={3}>
              <Typography>First Name</Typography>
              <TextField
 
                value={contact1.firstName}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Last Name</Typography>
              <TextField

                value={contact1.lastName}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Phone Number</Typography>
              <TextField
 
                value={contact1.phone}
                size="small"
                sx={inputStyle}
              />
            </Grid>
            <Grid size={3}>
              <Typography>Relationship</Typography>
              <TextField

                value={contact1.relationship}
                size="small"
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Card>
        <Button variant="contained">Submit</Button>
      </form>
      {/* </Card> */}
    </Box>
  );
};

export default CurrentInfo;
