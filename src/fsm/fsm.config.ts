import { MachineConfig } from 'xstate';
import { GameData } from './types';
import { Schema } from './fsm.schema';
export const fsmConfig: MachineConfig<GameData, Schema, any> = {
  predictableActionArguments: true,
  preserveActionOrder: true,
  initial: 'wait',
  states: {
    rotateText: {
      entry: 'updateView',
      always: [{ target: 'wait'}]
    },
    wait: {
      invoke: {
        src: 'wait',
        onDone: [{ target: 'rotateText', actions: ['updateData'] }]
      },
    }
  }
}
