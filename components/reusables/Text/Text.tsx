export interface TextProps extends React.CSSProperties {
  children?: React.ReactNode;
}

export function Text({ children, ...cssProps }: TextProps) {
  return <p style={cssProps}>{children}</p>;
}
