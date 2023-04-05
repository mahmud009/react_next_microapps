import React from "react";

export interface TextProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Text({ children, onClick, ...cssProps }: TextProps) {
  return (
    <p onClick={onClick} css={{ ...cssProps }}>
      {children}
    </p>
  );
}
