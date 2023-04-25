import { Binders } from "./fsm";

export const services = (binders: Binders) => ({
  wait: () => new Promise<void>((resolve) => setTimeout(() => resolve(), 1000)),
});
