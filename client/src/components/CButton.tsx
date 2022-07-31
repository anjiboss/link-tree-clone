import React, { CSSProperties } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

const CButton: React.FC<ButtonProps> = ({
  style,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{
        scale: 0.7,
      }}
      whileHover={{
        scale: 1.1,
      }}
      onClick={() => {
        onClick && onClick();
      }}
      className={`s-btn ${className}`}
      style={style}
    >
      {children}
    </motion.button>
  );
};
export default CButton;
