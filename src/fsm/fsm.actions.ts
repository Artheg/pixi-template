import { Params } from './fsm';
import { FSMEvent, FSMEventType, GameData } from './types';
import { assign } from 'xstate';

export const actions = (params: Params) => ({
  initialize: () => {
    const { stage } = params;
    Object.values(params.views).forEach((view) => stage.addChild(view));
  },

  resizeViews: (_context: GameData, event: FSMEvent) => {
    if (event.type !== FSMEventType.RESIZE) {
      throw new Error(`Expected ${FSMEventType.RESIZE}, got ${event.type}`);
    }
    const { width, height } = event.data;
    Object.values(params.views).forEach((view) => {
      if (typeof view['onResize'] === 'function') {
        view.onResize(width, height);
      }
    });
  },

  updateData: assign((context: GameData) => ({
    rotation: context.rotation + 0.1,
  })),

  updateView: (context: GameData) =>
    params.views.view.setTextRotation(context.rotation),
});
