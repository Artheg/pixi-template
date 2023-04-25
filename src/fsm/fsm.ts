import { createMachine, interpret } from "xstate";
import { GameData } from "./types";
import { fsmConfig } from "./fsm.config";
import { services as getServices } from "./fsm.services";
import { actions as getActions } from "./fsm.actions";
import { GAME_TYPES } from "../di/types";
import { Binder } from "./binder";
import { inject, injectable } from "inversify";

export type Binders = {
  binder: Binder;
};

@injectable()
export class FiniteStateMachine {
  constructor(@inject(GAME_TYPES.Binder) binder: Binder) {
    console.log("creating fsm");
    const binders: Binders = {
      binder,
    };
    const fsm = createMachine<GameData>(fsmConfig, {
      services: getServices(binders),
      actions: getActions(binders),
    }).withContext({ rotation: 0 });
    interpret(fsm).start();
  }
}
