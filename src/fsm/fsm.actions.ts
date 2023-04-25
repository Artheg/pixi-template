import { assign } from "xstate";
import { GameData } from "./types";
import { Binders } from "./fsm";

export const actions = (binders: Binders) => ({
  updateData: assign((context: GameData) => ({ rotation: context.rotation + 0.1 })),
  updateView: (context: GameData) => binders.binder.setTextRotation(context.rotation),
});
