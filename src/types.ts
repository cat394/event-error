/**
 * The type of the event.detail property for custom events used in this package.
 *
 * @example
 * // index.d.ts
 * import { AppErrorEvent } from "@kokomi/event-error";
 *
 * declare global {
 *  "appError": CustomEvent<AppErrorEvent>;
 * }
 */
export type AppErrorEvent = {
  error: Error;
};
