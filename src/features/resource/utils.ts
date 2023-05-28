// LOCAL FILES
// Interfaces & Types
import type { Resource, Resources } from "features/resource/types";
import { NO_RESOURCES, RESOURCE_TO_TRADE_RATES } from "./constants";

/**
 * Simple function to merge 2 resource objects together into a new object.
 */
export const mergeResources = (
  resources1: Resources,
  resources2: Resources,
): Resources => {
  const mergedResources = { ...resources1 };
  for (const resource in resources2) {
    mergedResources[resource as Resource] +=
      resources2[resource as Resource];
  }

  return mergedResources;
};

/**
 * Finds the minimum quantity of a resource that can be traded to ensure
 * the resource the player receives is a whole number.
 */
export const getMinTradeQuantity = (
  fromResource: Resource,
  toResource: Resource,
): number => {
  const tradeRate = RESOURCE_TO_TRADE_RATES[fromResource][toResource];
  let quantity = 1;
  while (quantity * tradeRate !== Math.round(quantity * tradeRate)) {
    quantity++;
  }

  return quantity;
};

/**
 * Calculates max quantity of a resource player can trade for based on their
 * current resources. Takes into account minimum quantity required for trade.
 */
export const getMaxTradeQuantity = (
  resources: Resources,
  fromResource: Resource,
  toResource: Resource,
): number => {
  const resourceAmount = resources[fromResource];
  const minQuantity = getMinTradeQuantity(fromResource, toResource);
  const maxNumberOfTrades = Math.floor(resourceAmount / minQuantity);
  return maxNumberOfTrades * minQuantity;
};

/**
 * Simple function to create a full Resources object from a partial definition.
 */
export const getResources = (
  resources: Partial<Resources>,
): Resources => Object.assign({ ...NO_RESOURCES }, resources);
