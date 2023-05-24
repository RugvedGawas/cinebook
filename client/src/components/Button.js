import React from 'react'

const Button = ({ title, onClick, variant, disabled, fullWidth, type }) => {

    let className = "bg-secondary p-1 text-black";

    if (fullWidth) {
      className += " w-full";
    }
    if (variant === "outlined") {
      className = className.replace(
        "bg-secondary",
        "border border-primary text-black bg-secondary"
      );
    }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button
