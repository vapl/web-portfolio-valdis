"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { IoPaperPlane } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";
import Spinner from "./Spinner";

type ButtonProps = {
  value: string;
  link?: string;
  type?: "button" | "submit" | "reset";
  status?: "idle" | "sending" | "error" | "success";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  value,
  type = "button",
  status: statusProp = "idle",
  link,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  icon = false,
}) => {
  // Local state for status if status prop is provided (uncontrolled)
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "error" | "success"
  >(statusProp);

  // Sync local status with prop if it changes
  React.useEffect(() => {
    setStatus(statusProp);
  }, [statusProp]);

  // Compute if button should be disabled
  const isDisabled = disabled || status === "sending";

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Base styles
  const baseStyles = `
    flex gap-2 justify-center items-center px-5 py-3 rounded-xl font-semibold text-sm uppercase 
    transition-all duration-100 hover:ease-out
    focus:outline-none
    ${
      !isDisabled
        ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-95"
        : ""
    }
    ${
      isDisabled
        ? "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        : ""
    }
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Text color based on status
  const textColor = () => {
    switch (status) {
      case "error":
        return "text-red-900";
      case "success":
        return "text-green-900";
      default:
        return "";
    }
  };

  // Variant styles
  const variantStyles = {
    primary: `bg-radial from-primary from-60%  to-secondary text-black/90 ${textColor()}
      ${!isDisabled ? "hover:shadow-primary/20" : ""}`,
    secondary: `bg-gray-600 text-white ${textColor()}
      ${!isDisabled ? "hover:bg-gray-700 hover:shadow-gray-600/20 " : ""}`,
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Render icon based on status
  const renderIcon = () => {
    switch (status) {
      case "sending":
        return <Spinner size={16} className="text-current" />;
      case "success":
        return <FaCheck size={16} aria-label="Success" />;
      case "error":
        return <VscError size={16} aria-label="Error" />;
      case "idle":
      default:
        return icon ? <IoPaperPlane size={16} aria-label="Send" /> : null;
    }
  };

  // Get button text based on status
  const buttonText = () => {
    switch (status) {
      case "sending":
        return "Sending...";
      case "success":
        return "Sent!";
      case "error":
        return "Something went wrong, try again.";
      default:
        return value;
    }
  };

  // If a link is provided, render a Link component
  if (link && !disabled) {
    return (
      <Link href={link} className="inline-block">
        <span
          className={buttonClasses}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
        >
          {value}
        </span>
      </Link>
    );
  }

  // Otherwise, render a button element
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {renderIcon()}
      {buttonText()}
    </button>
  );
};

export default Button;
