// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Slider, Typography } from "@mui/material";
import {
  ArrowRightAlt as ArrowRightAltIcon,
  Handshake as HandshakeIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Components
import { Image, StyledButton } from "features/common/components";
// Constants
import {
  RESOURCE_TO_IMAGE,
  RESOURCE_TO_TRADE_RATES,
} from "features/resource/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { selectEnabledResources } from "features/tier/selectors";
import { tradeResources } from "features/town/actions";
import { selectTownResources } from "features/town/selectors";
// Utility functions
import {
  getMaxTradeQuantity,
  getMinTradeQuantity,
} from "features/resource/utils";

export const Market: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const enabledResources = useAppSelector(selectEnabledResources);
  const townResources = useAppSelector(selectTownResources);

  // Local state
  const [fromResource, setFromResource] = useState<Resource | null>(
    null,
  );
  const [toResource, setToResource] = useState<Resource | null>(null);
  const [quantity, setQuantity] = useState(0);

  // Handlers
  const onSelectFromResource = (resource: Resource) => {
    setQuantity(0);

    // Deselect if clicked again
    setFromResource(resource === fromResource ? null : resource);
  };

  const onSelectToResource = (resource: Resource) => {
    setQuantity(0);

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
  let tradeText = "";
  if (fromResource && toResource && fromResource !== toResource) {
    const tradeRate =
      RESOURCE_TO_TRADE_RATES[fromResource][toResource];
    const quantity = getMinTradeQuantity(fromResource, toResource);
    tradeText = `I can offer you ${
      tradeRate * quantity
    } ${toResource} for ${quantity} ${fromResource}`;
  } else {
    tradeText =
      "We kindly ask you to treat our valuable goods with care. If you are interested in making a trade, simply select the items you would like to exchange and those you wish to receive by clicking on them.";
  }

  return (
    <Grid container direction="column" sx={{ mt: 1 }}>
      <Typography variant="body2">{tradeText}</Typography>
      <Grid container item spacing={2} sx={{ mt: 0 }} wrap="nowrap">
        <Grid container direction="column" item>
          <Typography align="center" variant="body2">
            Player Resources
          </Typography>
          <Grid container item>
            {enabledResources.map((resource) => {
              const isSelected = resource === fromResource;
              const playerAmount = townResources[resource];
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
                    border: 2,
                    borderColor: isSelected
                      ? "frame.light"
                      : "frame.dark",
                    cursor: "pointer",
                    p: 0.5,
                  }}
                  xs={6}
                >
                  <Image
                    src={RESOURCE_TO_IMAGE[resource]}
                    style={{ width: 64 }}
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
              const isSelected = resource === toResource;
              let tradeRate = NaN;
              let tradeRateText = "";
              if (fromResource) {
                tradeRate =
                  RESOURCE_TO_TRADE_RATES[fromResource][resource];
                if (fromResource === resource) {
                  tradeRateText = "N/A";
                } else if (Math.round(tradeRate) === tradeRate) {
                  tradeRateText = `1/${tradeRate}`;
                } else {
                  tradeRateText = `1/${tradeRate.toFixed(2)}`;
                }
              }

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
                    border: 2,
                    borderColor: isSelected
                      ? "frame.light"
                      : "frame.dark",
                    cursor: "pointer",
                    p: 0.5,
                  }}
                  xs={6}
                >
                  <Image
                    src={RESOURCE_TO_IMAGE[resource]}
                    style={{ width: 64 }}
                  />
                  {fromResource && (
                    <Typography variant="body1">
                      {tradeRateText}
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
            sx={{ mt: 2 }}
            wrap="nowrap"
          >
            <Grid
              alignItems="center"
              container
              direction="column"
              item
            >
              <Image
                src={RESOURCE_TO_IMAGE[fromResource]}
                style={{ width: 64 }}
              />
              <Typography variant="body1">{quantity}</Typography>
            </Grid>
            <Grid alignItems="center" container direction="column">
              <ArrowRightAltIcon color="frame" fontSize="large" />
              <Slider
                color="frame"
                disabled={fromResource === toResource}
                min={0}
                max={getMaxTradeQuantity(
                  townResources,
                  fromResource,
                  toResource,
                )}
                onChange={(_, value) => {
                  onQuantityChange(value as number);
                }}
                step={getMinTradeQuantity(fromResource, toResource)}
                value={quantity}
              />
            </Grid>

            <Grid
              alignItems="center"
              container
              direction="column"
              item
            >
              <Image
                src={RESOURCE_TO_IMAGE[toResource]}
                style={{ width: 64 }}
              />
              <Typography variant="body1">
                {RESOURCE_TO_TRADE_RATES[fromResource][toResource] *
                  quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <StyledButton
              disabled={quantity === 0 || fromResource === toResource}
              onClick={onConfirmTrade}
              startIcon={<HandshakeIcon />}
              width={100}
            >
              Trade
            </StyledButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};
