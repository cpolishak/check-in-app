import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Card, Typography, Button, TextField } from "@mui/material";

const History = () => {
  interface User {
    username: string;
    author: string;
  }

  interface Faker {
    data: User[];
  }

  const [fetchedData, setFetchedData] = useState<User[]>([]);
  const [ailmentsData, setAilmentsData] = useState<User[]>([]);
  const [isCheckedAilments, setIsCheckedAilments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isCheckedFamily, setIsCheckedFamily] = useState<{
    [key: string]: boolean;
  }>({});
  const [textInputs, setTextInputs] = useState<{ [key: string]: string }>({});

  // Lets assume this is first time for patient
  // so we would need to get all data with all unchecked
  const getAilments = async () => {
    const url = `https://fakerapi.it/api/v2/books?_quantity=10`;
    try {
      const response = await fetch(url);
      const data: Faker = await response.json();
      console.log(data.data);
      setAilmentsData(data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getHistory = async () => {
    // Fetching names instead of conditions, but the concept is the same
    const url = `https://jsonplaceholder.typicode.com/users`;
    try {
      const response = await fetch(url);
      const data: User[] = await response.json();
      // console.log(data);
      setFetchedData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    username: string
  ) => {
    setTextInputs({
      ...textInputs,
      [username]: e.target.value,
    });
  };

  const handleCheckbox = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
    author: string
  ) => {
    setIsCheckedAilments({
      ...isCheckedAilments,
      [author]: checked,
    });
  };

  const handleCheckboxFamily = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
    username: string
  ) => {
    setIsCheckedFamily({
      ...isCheckedFamily,
      [username]: checked,
    });
  };

  // Could be broken out into it's own component
  const list = (data: User[]) => {
    return (
      // Would need to be in a form to submit user's selected items
      <form onSubmit={handleSubmit}>
        <FormGroup sx={{ pb: 2 }}>
          {data.map((item) => (
            <FormControlLabel
              key={item.author}
              control={
                <Checkbox
                  checked={isCheckedAilments[item.author] || false}
                  onChange={(event, checked) =>
                    handleCheckbox(event, checked, item.author)
                  }
                />
              }
              label={item.author}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    );
  };

  // Could be broken into it's own component
  const familyList = (data: User[]) => {
    const isAnyTextFieldEmpty = () => {
      return Object.keys(isCheckedFamily).some(
        (username) =>
          isCheckedFamily[username] &&
          (!textInputs[username] || textInputs[username].length < 1)
      );
    };

    return (
      <form onSubmit={handleSubmit}>
        <FormGroup sx={{ pb: 2 }}>
          {data.map((item) => (
            <div
              key={item.username}
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "15px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedFamily[item.username] || false}
                    onChange={(event, checked) =>
                      handleCheckboxFamily(event, checked, item.username)
                    }
                  />
                }
                label={item.username}
              />
              {isCheckedFamily[item.username] ? (
                <>
                  <Typography sx={{ pl: 5 }}>Which family members?</Typography>
                  <TextField
                    error={textInputs[item.username] === ""}
                    sx={{ padding: 0, marginLeft: 4 }}
                    onChange={(e) => handleChange(e, item.username)}
                    value={textInputs[item.username] || ""}
                    label="Required"
                  ></TextField>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </FormGroup>
        <Button
          type="submit"
          disabled={isAnyTextFieldEmpty()}
          variant="contained"
        >
          Save
        </Button>
      </form>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkedAilments = Object.keys(isCheckedAilments)
      .filter((name) => isCheckedAilments[name])
      .map((name) => ({
        issue: name,
      }));

    const checkedItemsFamily = Object.keys(isCheckedFamily)
      .filter((name) => isCheckedFamily[name])
      .map((name) => ({
        issue: name,
        familyMember: textInputs[name] || "",
      }));

    console.log("Submitted the following Ailments: ", checkedAilments);
    console.log("Submitted the following Family info: ", checkedItemsFamily);

    // Ideally would submit via an API call to pass along the necessary data
    // postDataToBE() - Could set up a fetch like below
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ formData }),
      // };
      // try {
      //   const response = await fetch("https://backendOfApp/forms/${formData}", requestOptions);
      //   const data = await response.json();
      // } catch(error) {
      //   console.error("Error: ", error)
      // }
  };

  useEffect(() => {
    getAilments();
    getHistory();
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: "#cce4ec" }}>
      <Typography variant="h2">Ailments and Family History</Typography>
      <hr />
      <Typography variant="h5" pt={4}>
        Do you have (or have you had) any of the following issues: (Yes, these
        are names instead of conditions)
      </Typography>
      <Card sx={{ p: 2, backgroundColor: "#f1faff", m: 2, my: 4 }}>
        {list(ailmentsData)}
      </Card>
      <Typography variant="h5">
        Do you have a family history of any of the following?:
      </Typography>
      <Card sx={{ p: 2, backgroundColor: "#f1faff", m: 2, my: 4 }}>
        {familyList(fetchedData)}
      </Card>
    </Box>
  );
};

export default History;
