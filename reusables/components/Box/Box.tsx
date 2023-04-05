export interface BoxProps extends React.CSSProperties {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

export function Box({ children, onClick, ...cssProps }: BoxProps) {
  return (
    <div onClick={onClick} css={{ ...cssProps }}>
      {children}
    </div>
  );
}
