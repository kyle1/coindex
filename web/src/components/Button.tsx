import React, { useState } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  console.log("Button evaluated.");

  const [bgColor, setBgColor] = useState("#37c1d3");

  const styles: any = {
    color: "black",
    //background: "#53d337",
    background: bgColor,
    border: "0px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "70px",
    height: "35px",
    fontWeight: "bold",
  };

  return (
    <button
      {...props}
      style={styles}
      onMouseEnter={() => setBgColor("#2e9caa")}
      onMouseLeave={() => setBgColor("#37c1d3")}
    >
      {props.children}
    </button>
  );
};

export default Button;
