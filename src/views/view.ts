import { injectable } from "inversify";
import { Container, Text } from "pixi.js";

@injectable()
export class View extends Container {
  private _text: Text;
  constructor() {
    super();
    this._text = new Text(":)", { fontSize: 64 });
    this._text.anchor.set(0.5, 0.5);

    // @ts-ignore
    this._text.eventMode = 'static';
    // @ts-ignore
    this._text.on('pointertap', () => console.log('pointertap'))

    this.addChild(this._text);
  }

  setTextRotation(value: number): void {
    console.log('rotating!');
    this._text.rotation = value;
  }

  onResize(width: number, height: number): void {
    this._text.x = width * 0.5;
    this._text.y = height * 0.5;
  }
}
