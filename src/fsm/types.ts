export type GameData = {
  rotation: number;
};

export enum FSMEventType {
  RESIZE = 'RESIZE',
}

export type FSMEvent = {
  type: FSMEventType.RESIZE;
  data: { width: number; height: number };
};
