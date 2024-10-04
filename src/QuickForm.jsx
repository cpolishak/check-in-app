import React, { useState } from "react";
import { Button } from "@mui/material";

const QuickForm = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  // const [submitted, setSubmitted] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleLastNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  };

  const handleEmailInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSubmitted(true);
    // console.log("submitted", values.firstName, values.email, values.lastName);

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formObject);

    setValues((values) => ({
      ...values,
      firstName: "",
      lastName: "",
      email: "",
    }))
  };

  return (
    <>
      {/* {showSuccess && (
        <div className="success-message">Success! Thank you for registering</div>
      )} */}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          id="first-name"
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleFirstNameInputChange}
        />
        <input
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleLastNameInputChange}
        />
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleEmailInputChange}
        />
        <Button type="submit" variant="outlined">Submit</Button>
      </form>
      
    </>
  );
};

export default QuickForm;
