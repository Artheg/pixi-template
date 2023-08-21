import { StateSchema } from 'xstate';

export interface Schema extends StateSchema {
  states: {
    initialize: {};
    rotateText: {};
    wait: {};
  };
}
