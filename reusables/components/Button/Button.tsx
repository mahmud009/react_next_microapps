import styled from "styled-components";

export interface ButtonProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Button({ children, onClick, ...cssProps }: ButtonProps) {
  let Styled = styled.button({
    ...cssProps,
  });
  return <Styled onClick={onClick}>{children}</Styled>;
}
