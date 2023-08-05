// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

// LOCAL FILES
// Components
import {
  ReturnToTownButton,
  StyledContainer,
} from "features/common/components";
// Constants
import { BUTTON_HEIGHT } from "features/common/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectLogs } from "features/log/logSlice";

export const Log: FC<{}> = () => {
  // Hooks
  const theme = useTheme();
  const logs = useAppSelector(selectLogs);

  return (
    <StyledContainer>
      <Grid item>
        <ReturnToTownButton />
      </Grid>
      <List
        dense
        disablePadding
        sx={{
          height: `calc(100% - ${BUTTON_HEIGHT}px - ${theme.spacing(
            2,
          )})`,
          mt: 2,
          overflowY: "auto",
        }}
      >
        {logs.map((log, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText>{log.entry}</ListItemText>
          </ListItem>
        ))}
      </List>
    </StyledContainer>
  );
};
