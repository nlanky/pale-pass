// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Slider, Typography, useTheme } from "@mui/material";
import {
  ArrowRightAlt as ArrowRightAltIcon,
  Handshake as HandshakeIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Constants
import {
  RESOURCE_TO_ICON,
  RESOURCE_TO_TRADE_RATES,
} from "features/resource/constants";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
import {
  selectEnabledResources,
  selectPlayerResources,
  tradeResources,
} from "features/town/townSlice";

export const MarketStall: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const enabledResources = useAppSelector(selectEnabledResources);
  const playerResources = useAppSelector(selectPlayerResources);

  // Local state
  const [fromResource, setFromResource] = useState<Resource | null>(
    null,
  );
  const [toResource, setToResource] = useState<Resource | null>(null);
  const [quantity, setQuantity] = useState(0);

  // Handlers
  const onSelectFromResource = (resource: Resource) => {
    if (resource === toResource) {
      return;
    }

    // Deselect if clicked again
    setFromResource(resource === fromResource ? null : resource);
  };

  const onSelectToResource = (resource: Resource) => {
    // Can't trade resource with itself
    if (resource === fromResource) {
      return;
    }

    // Deselect if clicked again
    setToResource(resource === toResource ? null : resource);
  };

  const onQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const onConfirmTrade = () => {
    if (fromResource && toResource) {
      dispatch(
        tradeResources({ fromResource, toResource, quantity }),
      );
      setQuantity(0);
    }
  };

  // Derived variables
  const maxResourceAvailableToTrade =
    playerResources[fromResource as Resource];

  return (
    <Grid
      container
      direction="column"
      sx={{ marginTop: theme.spacing(1) }}
    >
      <Typography align="center" variant="body2">
        {fromResource && toResource
          ? `I can offer you 1 ${toResource} for ${RESOURCE_TO_TRADE_RATES[fromResource][toResource]} ${fromResource}`
          : "Hello there, what can I do for you?"}
      </Typography>
      <Grid
        container
        item
        spacing={2}
        sx={{ marginTop: 0 }}
        wrap="nowrap"
      >
        <Grid container direction="column" item>
          <Typography align="center" variant="body2">
            Player Resources
          </Typography>
          <Grid container item>
            {enabledResources.map((resource) => {
              const selectedResource = resource === fromResource;
              const playerAmount = playerResources[resource];
              return (
                <Grid
                  key={`from_${resource}`}
                  alignItems="center"
                  container
                  direction="column"
                  item
                  onClick={() => {
                    onSelectFromResource(resource);
                  }}
                  sx={{
                    border: selectedResource
                      ? `2px solid ${theme.palette.parchmentDark.light}`
                      : `2px solid ${theme.palette.parchmentDark.dark}`,
                    cursor: "pointer",
                  }}
                  xs={6}
                >
                  <img
                    src={RESOURCE_TO_ICON[resource]}
                    style={{ width: 50 }}
                  />
                  <Typography variant="body1">
                    {playerAmount}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container direction="column" item>
          <Typography align="center" noWrap variant="body2">
            Available for Trade
          </Typography>
          <Grid container item>
            {enabledResources.map((resource) => {
              const selectedResource = resource === toResource;
              return (
                <Grid
                  key={`to_${resource}`}
                  alignItems="center"
                  container
                  direction="column"
                  item
                  onClick={() => {
                    onSelectToResource(resource);
                  }}
                  sx={{
                    border: selectedResource
                      ? `2px solid ${theme.palette.parchmentDark.light}`
                      : `2px solid ${theme.palette.parchmentDark.dark}`,
                    cursor: "pointer",
                  }}
                  xs={6}
                >
                  <img
                    src={RESOURCE_TO_ICON[resource]}
                    style={{ width: 50 }}
                  />
                  {fromResource && (
                    <Typography variant="body1">
                      {`1/${RESOURCE_TO_TRADE_RATES[fromResource][resource]}`}
                    </Typography>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      {fromResource && toResource && (
        <>
          <Grid
            alignItems="center"
            container
            sx={{ marginTop: theme.spacing(2) }}
            wrap="nowrap"
          >
            <Grid
              alignItems="center"
              container
              direction="column"
              item
            >
              <img
                src={RESOURCE_TO_ICON[fromResource]}
                style={{ width: 50 }}
              />
              <Typography variant="body1">{quantity}</Typography>
            </Grid>
            <Grid alignItems="center" container direction="column">
              <ArrowRightAltIcon
                color="parchmentDark"
                fontSize="large"
              />
              <Slider
                color="parchmentDark"
                min={0}
                max={maxResourceAvailableToTrade}
                onChange={(_, value) => {
                  onQuantityChange(value as number);
                }}
                step={1}
                value={quantity}
              />
            </Grid>

            <Grid
              alignItems="center"
              container
              direction="column"
              item
            >
              <img
                src={RESOURCE_TO_ICON[toResource]}
                style={{ width: 50 }}
              />
              <Typography variant="body1">
                {RESOURCE_TO_TRADE_RATES[fromResource][toResource] *
                  quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <StyledButton
              disabled={quantity === 0}
              onClick={onConfirmTrade}
              startIcon={<HandshakeIcon />}
            >
              Trade
            </StyledButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};
