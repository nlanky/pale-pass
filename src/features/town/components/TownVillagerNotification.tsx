// REACT
import type { FC } from "react";
import { useEffect, useState } from "react";

// PUBLIC MODULES
import { Alert, Snackbar } from "@mui/material";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { usePrevious } from "features/common/hooks";
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectPlayerVillagerIdToVillager } from "features/town/townSlice";

export const TownVillagerNotification: FC<{}> = () => {
  // Hooks
  const villagerIdToVillager = useAppSelector(
    selectPlayerVillagerIdToVillager,
  );
  const previousVillagerIdToVillager = usePrevious(
    villagerIdToVillager,
  );

  // Local State
  const [notification, setNotification] = useState<{
    showing: boolean;
    content: string;
  }>({ showing: false, content: "" });

  // Effects
  useEffect(() => {
    if (!previousVillagerIdToVillager) {
      return;
    }

    const villagerIdsHealed: number[] = [];
    Object.keys(villagerIdToVillager).forEach((villagerId) => {
      const villagerIdInt = Number(villagerId);
      if (!previousVillagerIdToVillager[villagerIdInt]) {
        return;
      }

      const villager = villagerIdToVillager[villagerIdInt];
      const previousVillager =
        previousVillagerIdToVillager[villagerIdInt];
      if (
        previousVillager.state === "recovering" &&
        villager.state === "healthy"
      ) {
        villagerIdsHealed.push(villagerIdInt);
      }
    });

    if (villagerIdsHealed.length === 0) {
      return;
    }

    let nextContent = "";
    villagerIdsHealed.forEach((villagerId) => {
      nextContent += `${ID_TO_VILLAGER[villagerId].name} healed. `;
    });

    setNotification({
      showing: true,
      content: nextContent,
    });
  }, [villagerIdToVillager, previousVillagerIdToVillager]);

  // Handlers
  const onSnackbarClose = () => {
    setNotification({
      ...notification,
      showing: false,
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={5000}
      onClose={onSnackbarClose}
      open={notification.showing}
    >
      <Alert severity="info" sx={{ alignItems: "center" }}>
        {notification.content}
      </Alert>
    </Snackbar>
  );
};
