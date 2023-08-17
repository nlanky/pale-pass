// REACT
import { useState } from "react";
import type { FC } from "react";

// LOCAL FILES
// Components
import {
  PlaceholderText,
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { setView } from "features/system/actions";
import {
  selectTierScreens,
  selectTownTier,
} from "features/tier/selectors";

export const TierScreen: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const tier = useAppSelector(selectTownTier);
  const screens = useAppSelector(selectTierScreens);

  // Local state
  const [screenIndex, setScreenIndex] = useState(0);

  // Derived variables
  const screen = screens[screenIndex];
  const isFinalScreen = screens.length - 1 === screenIndex;
  const isFinalIntroductionScreen = isFinalScreen && tier === 1;
  const buttonText = isFinalIntroductionScreen
    ? "Create Character"
    : "Next";

  // Handlers
  const advanceScreen = () => {
    if (isFinalIntroductionScreen) {
      dispatch(setView("createCharacter"));
      return;
    }

    if (isFinalScreen) {
      dispatch(setView("town"));
      return;
    }

    setScreenIndex(screenIndex + 1);
  };

  return (
    <StyledContainer>
      <PlaceholderText
        sx={{ mb: 1 }}
        text={screen.text}
        variant="body2"
      />
      <StyledButton
        onClick={advanceScreen}
        width={isFinalIntroductionScreen ? 170 : 90}
      >
        {buttonText}
      </StyledButton>
    </StyledContainer>
  );
};
