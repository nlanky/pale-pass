// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

export const closeModal = createAction("villager/closeModal");
export const openModal = createAction<number>("villager/openModal");
