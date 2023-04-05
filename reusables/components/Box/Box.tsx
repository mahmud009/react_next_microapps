import styled from "styled-components";

export interface BoxProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Box({ children, onClick, ...cssProps }: BoxProps) {
  let Styled = styled.div({
    ...cssProps,
  });
  return <Styled onClick={onClick}>{children}</Styled>;
}
