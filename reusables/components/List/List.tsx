import React from "react";

export interface ListProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

const css = {
  default: {},
};

export function List({ onClick, children, ...cssProps }: ListProps) {
  return (
    <ul onClick={onClick} css={css.default} style={cssProps}>
      {children}
    </ul>
  );
}
