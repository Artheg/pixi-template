import { createMachine, interpret } from "xstate";
import { GameData } from "./types";
import { fsmConfig } from "./fsm.config";
import { services as getServices } from "./fsm.services";
import { actions as getActions } from "./fsm.actions";
import { GAME_TYPES } from "../di/types";
import { inject, injectable } from "inversify";
import { View } from "../views/view";

export type Params = {
  view: View
};

@injectable()
export class FiniteStateMachine {
  constructor(@inject(GAME_TYPES.View) view: View) {
    console.log("creating fsm");
    const params: Params = {
      view,
    };
    const fsm = createMachine<GameData>(fsmConfig, {
      services: getServices(params),
      actions: getActions(params),
    }).withContext({ rotation: 0 });
    interpret(fsm, { devTools: true }).start();
  }
}
