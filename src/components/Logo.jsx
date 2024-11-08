import React from "react";
import Image from "../assets/images/icons8-blog-512.png";

const Logo = ({ width = "100%" }) => {
  return <img src={Image} alt="Logo placeholder" style={{ width: width }} />;
};

export default Logo;
