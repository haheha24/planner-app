import { ReactNode } from "react";
import styled from "styled-components";

interface IProps extends React.DOMAttributes<HTMLButtonElement> {
  props?: React.MouseEventHandler<HTMLButtonElement>;
  theme?: { [key: string]: string};
  children?: ReactNode;
}

export const StyledButton = styled.button`
  font-size: ${(props) => props.theme.fontSize};
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;

  $:hover {
  }
`;

const Button = ({ children, ...props }: IProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
