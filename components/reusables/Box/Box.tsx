import styled from "styled-components";
export interface BoxProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Box({ children, onClick, ...cssProps }: BoxProps) {
  return (
    <div style={cssProps} onClick={onClick}>
      {children}
    </div>
  );
}
