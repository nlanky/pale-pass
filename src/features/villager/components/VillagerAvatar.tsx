// REACT
import type { CSSProperties, FC } from "react";

// PUBLIC MODULES
import { Avatar, SvgIcon, Typography } from "@mui/material";

// LOCAL FILES
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectTownVillager } from "features/town/townSlice";

interface VillagerAvatarProps {
  villagerId: number;
  hideStateOverlay?: boolean;
  hideStateText?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export const VillagerAvatar: FC<VillagerAvatarProps> = ({
  villagerId,
  hideStateOverlay = false,
  hideStateText = false,
  width = 128,
  height = 128,
  style = {},
}) => {
  // Hooks
  const townVillager = useAppSelector(selectTownVillager(villagerId));

  // Derived variables
  const { name, image } = ID_TO_VILLAGER[villagerId];
  const state = townVillager?.state || "healthy";

  return (
    <div style={{ position: "relative", ...style }}>
      <Avatar alt={name} src={image} sx={{ width, height }} />

      {!hideStateOverlay && (
        <>
          {state !== "healthy" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width,
                height,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
              }}
            />
          )}

          {state === "recovering" && (
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
                  <path d="M13 4H11L10 2H14L13 4M14 8V6H15V5H9V6H10V8C7.24 8 5 10.24 5 13V22H19V13C19 10.24 16.76 8 14 8M16 17H13V20H11V17H8V15H11V12H13V15H16V17Z" />
                </svg>
              </SvgIcon>
              <Typography component="span" variant="h4">
                {townVillager?.recoveryTimeRemaining}
              </Typography>
            </div>
          )}

          {state === "injured" && (
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
                <path d="M17.73,12L21.71,8.04C22.1,7.65 22.1,7 21.71,6.63L17.37,2.29C17,1.9 16.35,1.9 15.96,2.29L12,6.27L8,2.29C7.8,2.1 7.55,2 7.29,2C7.04,2 6.78,2.1 6.59,2.29L2.25,6.63C1.86,7 1.86,7.65 2.25,8.04L6.23,12L2.25,16C1.86,16.39 1.86,17 2.25,17.41L6.59,21.75C7,22.14 7.61,22.14 8,21.75L12,17.77L15.96,21.75C16.16,21.95 16.41,22.04 16.67,22.04C16.93,22.04 17.18,21.94 17.38,21.75L21.72,17.41C22.11,17 22.11,16.39 21.72,16L17.73,12M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7.29,10.96L3.66,7.34L7.29,3.71L10.91,7.33L7.29,10.96M10,13A1,1 0 0,1 9,12A1,1 0 0,1 10,11A1,1 0 0,1 11,12A1,1 0 0,1 10,13M12,15A1,1 0 0,1 11,14A1,1 0 0,1 12,13A1,1 0 0,1 13,14A1,1 0 0,1 12,15M14,11A1,1 0 0,1 15,12A1,1 0 0,1 14,13A1,1 0 0,1 13,12A1,1 0 0,1 14,11M16.66,20.34L13.03,16.72L16.66,13.09L20.28,16.71L16.66,20.34Z" />
              </svg>
            </SvgIcon>
          )}

          {state === "dead" && (
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
                <path d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z" />
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
            {state}
          </Typography>
          {state === "recovering" && (
            <Typography
              textAlign="center"
              variant="body1"
            >{`${townVillager?.recoveryTimeRemaining} days to recover`}</Typography>
          )}
        </>
      )}
    </div>
  );
};
