import styled from "styled-components";
import React from "react";

export interface TextProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Text({ children, onClick, ...cssProps }: TextProps) {
  let Styled = styled.p({
    ...cssProps,
  });
  return <Styled onClick={onClick}>{children}</Styled>;
}
