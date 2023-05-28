// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
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
  selectModalBuildingId,
} from "features/building/buildingSlice";

export const BuildingModal: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const modalBuildingId = useAppSelector(selectModalBuildingId);

  // Handlers
  const onModalClose = () => {
    dispatch(closeModal());
  };

  if (!modalBuildingId) {
    return null;
  }

  // Derived variables
  const modalBuilding = ID_TO_BUILDING[modalBuildingId];

  return (
    <Dialog
      onClose={onModalClose}
      open={modalBuildingId !== null}
      PaperComponent={StyledPaper}
    >
      {modalBuilding && (
        <>
          <DialogTitle>{modalBuilding.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              {modalBuilding.description}
            </Typography>
            {modalBuilding.id === 152 && (
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
