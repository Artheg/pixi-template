import { inject, injectable } from 'inversify';
import { Container } from 'pixi.js';
import { createMachine, interpret } from 'xstate';
import { GAME_TYPES } from '../di/types';
import { View } from '../views/view';
import { actions as getActions } from './fsm.actions';
import { fsmConfig } from './fsm.config';
import { services as getServices } from './fsm.services';
import { FSMEventType } from './types';

export type Params = {
  stage: Container;
  views: {
    view: View;
  };
};

@injectable()
export class FiniteStateMachine {
  constructor(
    @inject(GAME_TYPES.View) view: View,
    @inject(GAME_TYPES.Stage) stage: Container,
  ) {
    console.log('creating fsm');
    const params: Params = {
      stage,
      views: {
        view,
      },
    };

    const interpreter = interpret(
      createMachine(fsmConfig, {
        services: getServices(params),
        actions: getActions(params),
      }).withContext({ rotation: 0 }),
      { devTools: true },
    ).start();

    sendResizeEvent();
    window.addEventListener('resize', () => sendResizeEvent());

    function sendResizeEvent() {
      interpreter.send({
        type: FSMEventType.RESIZE,
        data: { width: window.innerWidth, height: window.innerHeight },
      });
    }
  }
}
