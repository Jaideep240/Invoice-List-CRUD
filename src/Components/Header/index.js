import React from "react";
import img1 from "../images/abclogo.svg";
import img2 from "../images/hrclogo.svg";

import "./styles.css";

export const Header = () => {
  return (
    <div className="header" style={{ margin: "0.5rem" }}>
      <div className="images">
        <img className="abclogo" src={img1} />
        <img className="hrclogo" src={img2} />
      </div>
      <div>
        <span>Invoice List</span>
      </div>
    </div>
  );
};
