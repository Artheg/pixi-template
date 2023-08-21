import { Container as DIContainer } from 'inversify';
import 'reflect-metadata';

import { GAME_TYPES } from './di/types';
import { FiniteStateMachine } from './fsm/fsm';
import { View } from './views/view';
import { Application } from 'pixi.js';

const app = new Application<HTMLCanvasElement>({
  resizeTo: window,
  backgroundColor: 0x4b0082,
});
document.body.appendChild(app.view);

const diContainer = new DIContainer({ skipBaseClassChecks: true });
diContainer.bind(GAME_TYPES.View).to(View).inSingletonScope();
diContainer.bind(GAME_TYPES.FSM).to(FiniteStateMachine).inSingletonScope();
diContainer.bind(GAME_TYPES.Stage).toConstantValue(app.stage);

// resolving dependencies
diContainer.get(GAME_TYPES.View);
diContainer.get(GAME_TYPES.FSM);
