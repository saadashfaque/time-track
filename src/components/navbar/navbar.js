import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./styles.css";

const Pages = [
  { title: "Tracker", link: "/" },
  { title: "Reports", link: "/reports" },
];

const Navbar = () => {
  return (
    <div className="Navbar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            Time Track
          </Typography>
          {Pages.map((page, idx) => (
            <Link key={idx} to={page.link} className="NavLink">
              <Button color="inherit" className="NavBtn">
                {page.title}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
