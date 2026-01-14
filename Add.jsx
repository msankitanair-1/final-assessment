import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: ""
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = async () => {
    // Prevent empty submissions
    if (!inputs.EmpName || !inputs.designation || !inputs.empId) {
      return alert("Please fill in all required fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/employees",
        inputs
      );
      console.log("SUCCESS:", response.data);
      alert("Employee added successfully ✅");

      // Reset form
      setInputs({ EmpName: "", designation: "", empId: "", img_url: "" });

      // Optional: navigate to home page
      navigate("/");
    } catch (error) {
      console.error("ERROR FULL:", error);

      if (error.response) {
        // Server returned an error
        alert(`Failed to add employee: ${error.response.data.message}`);
      } else if (error.request) {
        // No response from server
        alert("No response from backend");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Employee Name"
          onChange={inputHandler}
          name="EmpName"
          value={inputs.EmpName}
          fullWidth
        />

        <TextField
          variant="outlined"
          placeholder="Designation"
          onChange={inputHandler}
          name="designation"
          value={inputs.designation}
        />

        <TextField
          variant="outlined"
          placeholder="Employee Id"
          onChange={inputHandler}
          name="empId"
          value={inputs.empId}
        />

        <TextField
          variant="outlined"
          placeholder="Photo (paste image link)"
          onChange={inputHandler}
          name="img_url"
          value={inputs.img_url}
        />

        <Button variant="contained" color="secondary" onClick={addData}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
