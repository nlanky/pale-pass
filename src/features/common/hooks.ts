// REACT
import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// LOCAL FILES
// Interfaces & Types
import type { Dimensions } from "features/common/types";
// Utility functions
import { getWindowDimensions } from "features/common/utils";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * Gets dimensions of element.
 */
export const useDimensions = (ref: RefObject<any>): Dimensions => {
  // Local State
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  // Utility functions
  const getDimensions = () => ({
    width: ref.current ? ref.current.offsetWidth : 0,
    height: ref.current ? ref.current.offsetHeight : 0,
  });

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  // Effects
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};

/**
 * Gets dimensions of browser window.
 */
export const useWindowDimensions = (): Dimensions => {
  // Local State
  const [dimensions, setDimensions] = useState<Dimensions>(
    getWindowDimensions(),
  );

  // Utility functions
  const handleResize = () => {
    setDimensions(getWindowDimensions());
  };

  // Effects
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};
