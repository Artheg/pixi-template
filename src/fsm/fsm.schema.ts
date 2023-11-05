import { StateSchema } from 'xstate';

export interface Schema extends StateSchema {
  states: {
    initialize: StateSchema;
    rotateText: StateSchema;
    wait: StateSchema;
  };
}
