export interface BoxProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

const css = {
  default: {
    // width: "100%",
    // height: "100%",
  },
};

export function Box({ children, onClick, ...cssProps }: BoxProps) {
  return (
    <div onClick={onClick} css={css.default} style={cssProps}>
      {children}
    </div>
  );
}
