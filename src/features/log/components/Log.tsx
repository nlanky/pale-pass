// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, List, ListItem, ListItemText } from "@mui/material";

// LOCAL FILES
// Components
import {
  ReturnToTownButton,
  StyledContainer,
} from "features/common/components";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectLogs } from "features/log/logSlice";

export const Log: FC<{}> = () => {
  // Hooks
  const logs = useAppSelector(selectLogs);

  return (
    <StyledContainer>
      <Grid container direction="column" wrap="nowrap">
        <Grid item>
          <ReturnToTownButton />
        </Grid>
        <Grid item>
          <List dense disablePadding sx={{ mt: 2 }}>
            {logs.map((log, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText>{log.entry}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
