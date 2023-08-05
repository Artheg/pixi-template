import "reflect-metadata";
import { Container as DIContainer } from "inversify";
import { Application } from "pixi.js";
import { View } from "./views/view";
import { GAME_TYPES } from "./di/types";
import { FiniteStateMachine } from "./fsm/fsm";

const app = new Application<HTMLCanvasElement>({
  resizeTo: window,
  backgroundColor: 0x4b0082,
});
document.body.appendChild(app.view);

const diContainer = new DIContainer({ skipBaseClassChecks: true });
diContainer.bind(GAME_TYPES.View).to(View).inSingletonScope();
diContainer
  .bind<FiniteStateMachine>(GAME_TYPES.FSM)
  .to(FiniteStateMachine)
  .inSingletonScope();

// resolving dependencies
diContainer.get(GAME_TYPES.View);
diContainer.get(GAME_TYPES.FSM);

const views = [diContainer.get<View>(GAME_TYPES.View)];
views.forEach((view) => {
  app.stage.addChild(view);
  view.onResize(window.innerWidth, window.innerHeight);
});

window.addEventListener("resize", () => {
  views.forEach((view) => {
    view.onResize(window.innerWidth, window.innerHeight);
  });
});
