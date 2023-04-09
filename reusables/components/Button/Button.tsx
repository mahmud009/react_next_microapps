export interface ButtonProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

const css = {
  default: {},
};

export function Button({ children, onClick, ...cssProps }: ButtonProps) {
  return (
    <button css={css.default} style={cssProps} onClick={onClick}>
      {children}
    </button>
  );
}
