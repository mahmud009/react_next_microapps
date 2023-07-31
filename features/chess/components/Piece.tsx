import React from "react";
import {
  bishop_svg,
  king_svg,
  knight_svg,
  pawn_svg,
  rook_svg,
} from "./svg_data";

interface Props {
  type: number;

  width: number;
  height: number;

  colors: {
    body: string;
    stroke: string;
  };
}

export function Piece(props: Props) {
  const ref = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      const stroke = ref.current.children[0] as any;
      const body = ref.current.children[1] as any;
      const partial_body = ref.current.children[2] as any;
      if (stroke && body) {
        stroke.style.fill = props.colors.stroke;
        body.style.fill = props.colors.body;
      }

      if (props.type == 5 && partial_body) {
        partial_body.style.fill = props.colors.body;
      }
    }
  }, []);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox={`0 0 72 72`}
      fill="none"
    >
      {props.type == 1 ? king_svg : null}
      {props.type == 2 ? pawn_svg : null}
      {props.type == 3 ? knight_svg : null}
      {props.type == 4 ? bishop_svg : null}
      {props.type == 5 ? rook_svg : null}
    </svg>
  );
}
