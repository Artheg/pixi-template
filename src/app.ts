import { Application } from "pixi.js";

const app = new Application({
  resizeTo: window,
  backgroundColor: 0xff0000,
});
const parent = document.body;
document.body.replaceChild(app.view, parent.lastElementChild);
