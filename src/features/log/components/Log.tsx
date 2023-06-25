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
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectLogs } from "features/log/logSlice";

export const Log: FC<{}> = () => {
  // Hooks
  const theme = useTheme();
  const logs = useAppSelector(selectLogs);

  return (
    <StyledContainer
      sx={{
        // Adjust for margin around container
        height: `calc(100vh - ${theme.spacing(2)})`,
      }}
    >
      <Grid
        container
        direction="column"
        sx={{ height: "100%" }}
        wrap="nowrap"
      >
        <Grid item>
          <ReturnToTownButton sx={{ height: 44 }} />
        </Grid>
        <List
          dense
          disablePadding
          sx={{
            height: `calc(100% - 44px - ${theme.spacing(2)})`,
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
      </Grid>
    </StyledContainer>
  );
};
