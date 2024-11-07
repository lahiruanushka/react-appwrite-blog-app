import React from "react";
import Image from "../assets/icons8-blog-96.png";

const Logo = ({ width = "100%" }) => {
  return <img src={Image} alt="Logo placeholder" style={{ width: width }} />;
};

export default Logo;
