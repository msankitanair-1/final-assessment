import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../App.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // for modal
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formValues, setFormValues] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: "",
  });

  const BASE_URL = "http://localhost:5000"; // backend port

  // Fetch all employees
  const fetchData = () => {
    axios
      .get(`${BASE_URL}/employees`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete employee
  const handleDelete = (empId) => {
    axios
      .delete(`${BASE_URL}/employees/${empId}`)
      .then((res) => {
        alert(res.data.message);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  // Open modal with selected employee data
  const handleOpenUpdate = (employee) => {
    setSelectedEmployee(employee);
    setFormValues({
      EmpName: employee.EmpName,
      designation: employee.designation,
      empId: employee.empId,
      img_url: employee.img_url,
    });
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Submit update
  const handleUpdateSubmit = () => {
    axios
      .put(`${BASE_URL}/employees/${selectedEmployee.empId}`, formValues)
      .then((res) => {
        alert(res.data.message);
        fetchData();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Mar">
      <Grid container spacing={6}>
        {data.map((val) => (
          <Grid item xs={12} sm={6} md={4} key={val.empId}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <img
                  src={val.img_url}
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
                  onClick={() => handleDelete(val.empId)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenUpdate(val)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Employee Name"
            name="EmpName"
            fullWidth
            value={formValues.EmpName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Designation"
            name="designation"
            fullWidth
            value={formValues.designation}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Employee ID"
            name="empId"
            fullWidth
            value={formValues.empId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Image URL"
            name="img_url"
            fullWidth
            value={formValues.img_url}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
