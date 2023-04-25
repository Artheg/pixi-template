import { injectable, inject } from "inversify";
import { GAME_TYPES } from "../di/types";
import { View } from "../views/view";

@injectable()
export class Binder {
  constructor(@inject(GAME_TYPES.View) private readonly _view: View) {}

  setTextRotation(value: number): void {
    this._view.setTextRotation(value);
  }
}
