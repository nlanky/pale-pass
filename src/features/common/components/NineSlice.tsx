// REACT
import type { CSSProperties, FC, ReactNode } from "react";

// LOCAL FILES
// Assets
import nineSliceImage from "assets/common/nineSlice.png";

export interface NineSliceStyles {
  container?: CSSProperties;
  content?: CSSProperties;
}

interface NineSliceProps {
  width: number;
  height: number;
  styles?: NineSliceStyles;
  children: ReactNode;
}

const IMAGE_URL = nineSliceImage;
const IMAGE_WIDTH = 1018;
const IMAGE_HEIGHT = 1018;

export const NineSlice: FC<NineSliceProps> = ({
  width,
  height,
  styles = {
    container: {},
    content: {},
  },
  children,
}) => {
  // Derived variables
  const scaleX = width / IMAGE_WIDTH;
  const scaleY = height / IMAGE_HEIGHT;

  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
        lineHeight: 0,
        ...styles.container,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          lineHeight: 1,
          verticalAlign: "top",
          backgroundImage: `url(${IMAGE_URL})`,
          imageRendering: "pixelated",
          transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
          transformOrigin: "left top",
        }}
      />
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          width: width,
          height: height,
          zIndex: 1,
          boxSizing: "border-box",
          lineHeight: 1.39,
          ...styles.content,
        }}
      >
        {children}
      </div>
    </div>
  );
};
