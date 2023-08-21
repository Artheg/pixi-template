import { Params } from './fsm';

export const services = (_params: Params) => ({
  wait: () => new Promise<void>((resolve) => setTimeout(() => resolve(), 100)),
});
