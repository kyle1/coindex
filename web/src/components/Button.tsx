import React, { useState } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  console.log("Button evaluated.");

  // const [bgColor, setBgColor] = useState("#2e9caa");
  const [bgColor, setBgColor] = useState("#aa70c7");

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
    ...props.style,
  };

  return (
    <button
      {...props}
      style={styles}
      // onMouseEnter={() => setBgColor("#2c8e9b")}
      // onMouseLeave={() => setBgColor("#2e9caa")}
      onMouseEnter={() => setBgColor("#c298d8")}
      onMouseLeave={() => setBgColor("#aa70c7")}
    >
      {props.children}
    </button>
  );
};

export default Button;
