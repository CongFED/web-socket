import React from "react";
interface Props {
  onClick: any;
}
const Button = ({ onClick }: Props) => {
  return <div onClick={onClick}>Button</div>;
};

export default Button;
