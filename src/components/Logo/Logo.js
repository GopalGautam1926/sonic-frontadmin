import React from "react";
import { useHistory } from "react-router-dom";
import logoImg from '../../assets/images/Logo-colour-simple-bluecolor.png'

export default function Logo({ ...props }) {
  const history = useHistory();
  return (
    <img
      style={{ width: "25%", cursor: "pointer", ...props.style }}
      src={logoImg}
      alt="logo"
      onClick={() => history.push("/admin/dashboard")}
      {...props}
    />
  );
}
