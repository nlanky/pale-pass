// REACT
import type { FC, ImgHTMLAttributes } from "react";

export const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  ...props
}) => <img loading="lazy" {...props} />;
