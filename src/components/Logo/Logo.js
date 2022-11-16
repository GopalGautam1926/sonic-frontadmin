import React from "react";
import { useHistory } from "react-router-dom";
import logoImg from '../../assets/images/amazingLogoTransparent-300x95.png'


export default function Logo({ ...props }) {
  const history = useHistory();
  return (
    <img
      style={{ width: "50%", cursor: "pointer", ...props.style }}
      src={logoImg}
      alt="logo"
      onClick={() => history.push("/admin/dashboard")}
      {...props}
    />
  );
}
