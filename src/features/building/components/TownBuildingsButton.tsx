// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { SvgIcon } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/system/actions";

export const TownBuildingsButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onBuildingsClick = () => {
    dispatch(setView("building"));
  };

  return (
    <StyledButton
      onClick={onBuildingsClick}
      startIcon={
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17,16H15V22H12V17H8V22H5V16H3L10,10L17,16M6,2L10,6H9V9H7V6H5V9H3V6H2L6,2M18,3L23,8H22V12H19V9H17V12H15.34L14,10.87V8H13L18,3Z" />
          </svg>
        </SvgIcon>
      }
      width={185}
    >
      Buildings
    </StyledButton>
  );
};
