import { MachineConfig } from 'xstate';
import { Schema } from './fsm.schema';
import { FSMEvent, GameData } from './types';

export const fsmConfig: MachineConfig<GameData, Schema, FSMEvent> = {
  predictableActionArguments: true,
  preserveActionOrder: true,
  initial: 'initialize',
  on: {
    RESIZE: {
      actions: ['resizeViews'],
    },
  },
  states: {
    initialize: {
      always: [{ actions: 'initialize', target: 'wait' }],
    },
    rotateText: {
      entry: 'updateView',
      always: [{ target: 'wait' }],
    },
    wait: {
      invoke: {
        src: 'wait',
        onDone: [{ target: 'rotateText', actions: ['updateData'] }],
      },
    },
  },
};
