// REACT
import { forwardRef, type ImgHTMLAttributes } from "react";

export const Image = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => <img loading="lazy" ref={ref} {...props} />);
