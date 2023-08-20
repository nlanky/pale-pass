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

export const TownResourcesButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onResourcesClick = () => {
    dispatch(setView("resource"));
  };

  return (
    <StyledButton
      onClick={onResourcesClick}
      startIcon={
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16,9C20,11 21,18 21,18C21,18 22,22 16,22C10,22 8,22 8,22C2,22 3,18 3,18C3,18 4,11 8,9M14,4L12,2L10,4L6,2L8,7H16L18,2L14,4Z" />
          </svg>
        </SvgIcon>
      }
      width={185}
    >
      Resources
    </StyledButton>
  );
};
