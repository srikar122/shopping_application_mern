import React from "react";
import "./Home.css";
import { Outlet } from "react-router-dom";
import CardDetails from "../cartDetails/CardDetails";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function Home() {
  let text = 'commodity search system...'
  return (
    <div>
      {/* <CardDetails></CardDetails> */}
      <div className="home-container">
        <div className="background-image">
          {/* Your background image goes here */}

          <div className="letter-by-letter-container">
            <h1 className="letter-by-letter-heading">
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className="animated-text"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="search-container">
          <Button
            variant="contained"
            color="success"
            className="home-button"
            Width="50px"
          >
            <Link to="/search" className="home-link">
              Search for products
            </Link>
          </Button>
        </div>

        <div className="footer">
          {/* Professional details of the organization */}
        </div>
      </div>
    </div>
  );
}

export default Home;
