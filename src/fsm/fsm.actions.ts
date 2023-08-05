import { assign } from "xstate";
import { GameData } from "./types";
import { Params } from "./fsm";

export const actions = (params: Params) => ({
  updateData: assign((context: GameData) => ({ rotation: context.rotation + 0.1 })),
  updateView: (context: GameData) => params.view.setTextRotation(context.rotation),
});
