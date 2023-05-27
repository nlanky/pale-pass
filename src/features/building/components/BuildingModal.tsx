// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  useTheme,
} from "@mui/material";

// LOCAL FILES
// Components
import { MarketStall } from "features/building/components";
import { StyledPaper } from "features/common/components";
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// CSS
import "features/town/components/TownBuildings.css";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import {
  closeModal,
  selectOpenBuildingModal,
} from "features/building/buildingSlice";

export const BuildingModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const openModal = useAppSelector(selectOpenBuildingModal);

  // Handlers
  const onModalClose = () => {
    dispatch(closeModal());
  };

  if (!openModal) {
    return null;
  }

  // Derived variables
  const modalBuilding = ID_TO_BUILDING[openModal];

  return (
    <Dialog
      onClose={onModalClose}
      open={openModal !== null}
      PaperComponent={StyledPaper}
    >
      {modalBuilding && (
        <>
          <DialogTitle>{modalBuilding.name}</DialogTitle>
          <DialogContent>
            <DialogContentText variant="body2">
              Add description here?
            </DialogContentText>
            {modalBuilding.name === "Market Stall" && (
              <>
                <Divider sx={{ marginTop: theme.spacing(1) }} />
                <MarketStall />
              </>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
