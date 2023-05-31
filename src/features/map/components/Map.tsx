// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container } from "@mui/material";
import { StyledButton } from "features/common/components";

// LOCAL FILES
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/gameSlice";

export const Map: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onReturnToTown = () => {
    dispatch(setView("town"));
  };

  return (
    <Container maxWidth="lg">
      <StyledButton onClick={onReturnToTown}>
        Return to Town
      </StyledButton>
    </Container>
  );
};
