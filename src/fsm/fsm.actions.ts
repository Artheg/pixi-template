import { assign } from 'xstate';
import { Params } from './fsm';
import { FSMEvent, FSMEventType, GameData } from './types';

export const actions = (params: Params) => ({
  initialize: () => {
    const { stage } = params;
    for (const view of Object.values(params.views)) {
      stage.addChild(view);
    }
  },

  resizeViews: (_context: GameData, event: FSMEvent) => {
    if (event.type !== FSMEventType.RESIZE) {
      throw new Error(`Expected ${FSMEventType.RESIZE}, got ${event.type}`);
    }
    const { width, height } = event.data;
    for (const view of Object.values(params.views)) {
      if (typeof view.onResize === 'function') {
        view.onResize(width, height);
      }
    }
  },

  updateData: assign((context: GameData) => ({
    rotation: context.rotation + 0.1,
  })),

  updateView: (context: GameData) =>
    params.views.view.setTextRotation(context.rotation),
});
