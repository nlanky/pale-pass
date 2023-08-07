// REACT
import type { CSSProperties, FC, ReactNode } from "react";

// LOCAL FILES
// Assets
import { nineSliceImage } from "assets/common";
// Constants
import { DEFAULT_NINE_SLICE_BORDER_WIDTH } from "features/common/constants";

export interface NineSliceStyles {
  container?: CSSProperties;
  content?: CSSProperties;
}

interface NineSliceProps {
  /** Width of content container, including horizontal borders */
  width: number;
  /** Height of content container, including vertical borders */
  height: number;
  /** Borders around content */
  borders?: {
    horizontal: number; // Applied to left and right of container
    vertical: number; // Applied to top and bottom of container
  };
  /** Custom styles for container and content divs */
  styles?: NineSliceStyles;
  children: ReactNode;
}

const IMAGE_URL = nineSliceImage;
const IMAGE_WIDTH = 1018;
const IMAGE_HEIGHT = 1018;
const ABSOLUTE = "absolute";
const RELATIVE = "relative";

export const NineSlice: FC<NineSliceProps> = ({
  width,
  height,
  borders = {
    horizontal: DEFAULT_NINE_SLICE_BORDER_WIDTH,
    vertical: DEFAULT_NINE_SLICE_BORDER_WIDTH,
  },
  styles = {
    container: {},
    content: {},
  },
  children,
}) => {
  // Derived variables
  const horizontalBorder = borders.horizontal;
  const verticalBorder = borders.vertical;
  const baseStyle: CSSProperties = {
    width: horizontalBorder,
    height: verticalBorder,
    display: "inline-flex",
    backgroundImage: `url(${IMAGE_URL})`,
    imageRendering: "pixelated",
  };
  const imageWidthMinusBorders = IMAGE_WIDTH - 2 * horizontalBorder;
  const imageHeightMinusBorders = IMAGE_HEIGHT - 2 * verticalBorder;
  const imageWidthPlusBorder = IMAGE_WIDTH + horizontalBorder;
  const imageHeightPlusBorder = IMAGE_HEIGHT + verticalBorder;
  const containerWidthMinusBorder = width - horizontalBorder;
  const containerHeightMinusBorder = height - verticalBorder;
  const negativeHorizontalBorder = -horizontalBorder;
  const containerWidthMinusBorders = width - 2 * horizontalBorder;
  const containerHeightMinusBorders = height - 2 * verticalBorder;
  const scaleX = containerWidthMinusBorders / imageWidthMinusBorders;
  const scaleY =
    containerHeightMinusBorders / imageHeightMinusBorders;

  return (
    <div
      style={{
        position: RELATIVE,
        width,
        height,
        lineHeight: 0,
        ...styles.container,
      }}
    >
      {/* TOP OF IMAGE */}
      <div
        style={{ position: RELATIVE, width, height: verticalBorder }}
      >
        {/* NORTH WEST */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: 0,
          }}
        />
        {/* NORTH */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: horizontalBorder,
            width: imageWidthMinusBorders,
            backgroundPositionX: negativeHorizontalBorder,
            transform: `scaleX(${scaleX})`,
            transformOrigin: "left",
          }}
        />
        {/* NORTH EAST */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: containerWidthMinusBorder,
            backgroundPositionX: imageWidthPlusBorder,
          }}
        />
      </div>

      {/* MIDDLE OF IMAGE */}
      <div
        style={{
          position: RELATIVE,
          width,
          height: containerHeightMinusBorders,
        }}
      >
        {/* WEST */}
        <div
          style={{
            ...baseStyle,
            height: imageHeightMinusBorders,
            backgroundPositionY: -verticalBorder,
            transform: `scaleY(${scaleY})`,
            transformOrigin: "left top",
          }}
        />
        {/* CENTER */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: horizontalBorder,
            width: imageWidthMinusBorders,
            height: imageHeightMinusBorders,
            lineHeight: 1,
            verticalAlign: "top",
            transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
            transformOrigin: "left top",
            backgroundPositionX: negativeHorizontalBorder,
            backgroundPositionY: -verticalBorder,
          }}
        />
        {/* EAST */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: containerWidthMinusBorder,
            height: imageHeightMinusBorders,
            backgroundPositionX: imageWidthPlusBorder,
            backgroundPositionY: -verticalBorder,
            transformOrigin: "left top",
            transform: `scaleY(${scaleY})`,
          }}
        />
        {/* CONTENT */}
        <div
          style={{
            position: ABSOLUTE,
            top: 0,
            left: horizontalBorder,
            width: containerWidthMinusBorders,
            height: containerHeightMinusBorders,
            lineHeight: 1.39,
            zIndex: 1,
            boxSizing: "border-box",
            ...styles.content,
          }}
        >
          {children}
        </div>
      </div>

      {/* BOTTOM OF IMAGE */}
      <div
        style={{
          position: ABSOLUTE,
          top: containerHeightMinusBorder,
          width,
          height: verticalBorder,
        }}
      >
        {/* SOUTH WEST */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: 0,
            backgroundPositionY: imageHeightPlusBorder,
          }}
        />
        {/* SOUTH */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: horizontalBorder,
            width: imageWidthMinusBorders,
            backgroundPositionX: negativeHorizontalBorder,
            backgroundPositionY: imageHeightPlusBorder,
            transformOrigin: "left",
            transform: `scaleX(${scaleX})`,
          }}
        />
        {/* SOUTH EAST */}
        <div
          style={{
            ...baseStyle,
            position: ABSOLUTE,
            top: 0,
            left: containerWidthMinusBorder,
            backgroundPositionX: imageWidthPlusBorder,
            backgroundPositionY: imageHeightPlusBorder,
          }}
        />
      </div>
    </div>
  );
};
