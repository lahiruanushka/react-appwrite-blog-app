import React from "react";
import Image from "../assets/images/icon.png";

const Logo = ({ width = "100%" }) => {
  return <img src={Image} alt="Logo placeholder" style={{ width: width }} />;
};

export default Logo;
