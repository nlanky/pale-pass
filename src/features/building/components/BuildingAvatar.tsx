// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Avatar, SvgIcon, Typography } from "@mui/material";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectTownBuilding } from "features/town/townSlice";

interface BuildingAvatarProps {
  buildingId: number;
  isInterior?: boolean;
  hideStateOverlay?: boolean;
  hideStateText?: boolean;
  width?: number;
  height?: number;
}

export const BuildingAvatar: FC<BuildingAvatarProps> = ({
  buildingId,
  isInterior = false,
  hideStateOverlay = false,
  hideStateText = false,
  width = 128,
  height = 128,
}) => {
  // Hooks
  const townBuilding = useAppSelector(selectTownBuilding(buildingId));

  // Derived variables
  const { name, images } = ID_TO_BUILDING[buildingId];
  const state = townBuilding?.state;
  const underConstruction = state === "under construction";

  return (
    <div style={{ position: "relative" }}>
      <Avatar
        alt={name}
        src={
          state && !underConstruction
            ? isInterior
              ? images["interior"]
              : images["exterior"]
            : images["sketch"]
        }
        sx={{ width, height }}
      />

      {!hideStateOverlay && (
        <>
          {state && state !== "built" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 128,
                height: 128,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
              }}
            />
          )}

          {state === "under construction" && (
            <div
              style={{
                alignItems: "center",
                color: "white",
                display: "flex",
                left: "50%",
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SvgIcon
                sx={{
                  fontSize: "5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.8,17L5.9,11.6L20,2L22,5V8H19V11H16V14H13V17M9.7,18.7L9.2,21.5L7.6,22.7C6.7,23.3 5.5,23.1 4.8,22.2L1.3,17.3C0.7,16.4 0.9,15.2 1.8,14.5L5.1,12.2L9.7,18.7M4.6,15L3,16.1L6.5,21L8.1,19.8L4.6,15Z" />
                </svg>
              </SvgIcon>
              <Typography component="span" variant="h4">
                {townBuilding?.buildTimeRemaining}
              </Typography>
            </div>
          )}

          {state === "being repaired" && (
            <div
              style={{
                alignItems: "center",
                color: "white",
                display: "flex",
                left: "50%",
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SvgIcon
                sx={{
                  fontSize: "5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.78 15.3L19.78 21.3L21.89 19.14L15.89 13.14L13.78 15.3M17.5 10.1C17.11 10.1 16.69 10.05 16.36 9.91L4.97 21.25L2.86 19.14L10.27 11.74L8.5 9.96L7.78 10.66L6.33 9.25V12.11L5.63 12.81L2.11 9.25L2.81 8.55H5.62L4.22 7.14L7.78 3.58C8.95 2.41 10.83 2.41 12 3.58L9.89 5.74L11.3 7.14L10.59 7.85L12.38 9.63L14.2 7.75C14.06 7.42 14 7 14 6.63C14 4.66 15.56 3.11 17.5 3.11C18.09 3.11 18.61 3.25 19.08 3.53L16.41 6.2L17.91 7.7L20.58 5.03C20.86 5.5 21 6 21 6.63C21 8.55 19.45 10.1 17.5 10.1Z" />
                </svg>
              </SvgIcon>
              <Typography component="span" variant="h4">
                {townBuilding?.repairTimeRemaining}
              </Typography>
            </div>
          )}

          {state === "damaged" && (
            <SvgIcon
              htmlColor="#fff"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: "5rem",
                transform: "translate(-50%, -50%)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </SvgIcon>
          )}

          {state === "destroyed" && (
            <SvgIcon
              htmlColor="#fff"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: "5rem",
                transform: "translate(-50%, -50%)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
              </svg>
            </SvgIcon>
          )}
        </>
      )}

      {!hideStateText && (
        <>
          <Typography
            sx={{
              mt: 1,
              ":first-letter": {
                textTransform: "capitalize",
              },
            }}
            textAlign="center"
            variant="body2"
          >
            {state || "Available to build"}
          </Typography>
          {state === "under construction" && (
            <Typography
              textAlign="center"
              variant="body1"
            >{`${townBuilding?.buildTimeRemaining} days to build`}</Typography>
          )}
          {state === "being repaired" && (
            <Typography
              textAlign="center"
              variant="body1"
            >{`${townBuilding?.repairTimeRemaining} days to build`}</Typography>
          )}
        </>
      )}
    </div>
  );
};
