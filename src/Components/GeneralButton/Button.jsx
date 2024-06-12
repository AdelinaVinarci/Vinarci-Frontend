import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, onClick, optClassName, OverwriteClassName }) => {
  
  let className = undefined
  
  if (optClassName !== undefined) {
    if(OverwriteClassName !== undefined || OverwriteClassName) {
      className = optClassName
    }
    else {
      className = `${styles.defaultButton} ${optClassName}`
    }
  }
  else {
    className = styles.defaultButton
  }
  
  return (
  <div className={className}>
    <button onClick={onClick}>{text}</button>
  </div>
  );
};

export default Button;
