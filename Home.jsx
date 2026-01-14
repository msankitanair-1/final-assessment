import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import "../App.css";

const Home = () => {
  const [data, setData] = useState([]);

  // Fetch all employees from backend
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setData(data.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update employee
  const handleUpdate = async (emp) => {
    try {
      // Simple prompt for demo purposes
      const newName = prompt("Enter new Employee Name", emp.EmpName);
      const newDesignation = prompt(
        "Enter new Designation",
        emp.designation
      );
      const newEmpId = prompt("Enter new Employee ID", emp.empId);
      const newImg = prompt("Enter new Image URL", emp.img_url);

      if (!newName || !newDesignation || !newEmpId) return;

      const updatedData = {
        EmpName: newName,
        designation: newDesignation,
        empId: newEmpId,
        img_url: newImg,
      };

      const res = await axios.put(
        `http://localhost:5000/update/${emp._id}`,
        updatedData
      );

      // Update local state
      setData(data.map((e) => (e._id === emp._id ? res.data : e)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Mar">
      <Grid container spacing={6}>
        {data.map((val) => (
          <Grid item xs={12} sm={6} md={4} key={val._id}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <img
                  src={val.img_url || "https://via.placeholder.com/150"}
                  className="img-fluid rounded-start"
                  width="100%"
                  alt="employee"
                />
                <Typography gutterBottom variant="h5">
                  {val.EmpName}
                </Typography>
                <Typography component="div">{val.designation}</Typography>
                <Typography component="div">{val.empId}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(val._id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdate(val)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
