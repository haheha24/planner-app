import { ReactNode } from "react";
import styled from "styled-components";

type IProps = {
  children: ReactNode;
};

const StyledH1 = styled.h1`
  color: ${({theme}) => theme.text}};
  background-color: ${({theme}) => theme.body}
`;

export const H1 = ({ children }: IProps) => {
  return <StyledH1>{children}</StyledH1>;
};

const StyledH2 = styled.h2`
  color: ${({theme}) => theme.text}};
  background-color: ${({theme}) => theme.body}
`;

export const H2 = ({ children }: IProps) => {
  return <StyledH2>{children}</StyledH2>;
};

const StyledH3 = styled.h3`
  color: ${({theme}) => theme.text}};
  background-color: ${({theme}) => theme.body}
`;

export const H3 = ({ children }: IProps) => {
  return <StyledH3>{children}</StyledH3>;
};

