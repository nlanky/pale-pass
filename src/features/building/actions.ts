// PUBLIC MODULES
import { createAction } from "@reduxjs/toolkit";

export const closeModal = createAction("building/closeModal");
export const openModal = createAction<number>("building/openModal");
