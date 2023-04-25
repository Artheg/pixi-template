import { MachineSchema, StateSchema } from "xstate";

export interface Schema extends StateSchema  {
  states: {
    rotateText: {},
    wait: {}
  }
}
