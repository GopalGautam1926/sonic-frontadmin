import React from "react";
import logoImg from '../../assets/images/Logo-colour-simple-bluecolor.png'

export default function Logo({ ...props }) {
  return (
    <img
      style={{ width: "25%", ...props.style }}
      src={logoImg}
      alt="logo"
      {...props}
    />
  );
}
