import React from "react";

type Props = {
  value: string;
  className?: string;
  click: () => void;
};

const Button = ({ value, className, click }: Props) => {
  return (
    <div
      onClick={click}
      className={`flex items-center justify-center h-16 text-2xl font-medium rounded-full shadow-md cursor-pointer ${className}`}
    >
      {value}
    </div>
  );
};

export default Button;
