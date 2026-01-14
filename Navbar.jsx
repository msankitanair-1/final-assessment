import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#9c27b0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EmployeeApp
        </Typography>

        {/* Right Icons */}
        <div>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate("/add")}>
            <AddIcon />
          </IconButton>
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;





