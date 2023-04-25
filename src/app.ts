import "reflect-metadata";
import { Container as DIContainer, decorate, injectable } from "inversify";
import { Application, Container, DisplayObject, utils } from "pixi.js";
import { View } from "./views/view";
import { GAME_TYPES } from "./di/types";

decorate(injectable(), Container);
decorate(injectable(), DisplayObject);
decorate(injectable(), utils.EventEmitter);

const app = new Application<HTMLCanvasElement>({
  resizeTo: window,
  backgroundColor: 0x4b0082,
});
document.body.appendChild(app.view);

const diContainer = new DIContainer();
diContainer.bind(GAME_TYPES.View).to(View).inSingletonScope();

const views = [diContainer.get<View>(GAME_TYPES.View)];
views.forEach((view) => {
  app.stage.addChild(view);
  view.onResize(window.innerWidth, window.innerHeight);
});

setInterval(() => {
  diContainer.get<View>(GAME_TYPES.View).rotateText();
}, 1000);
