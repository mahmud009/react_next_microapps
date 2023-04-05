import React from "react";

export interface ListProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  spacing?: number;
}

export function List({ onClick, children, spacing, ...cssProps }: ListProps) {
  return (
    <ul onClick={onClick} css={{ ...cssProps }}>
      {children}
    </ul>
  );
}
