export {};

declare global {
  interface Global {
    mongooseGlobal?: {
      conn: import("mongoose").Connection | null;
      promise: Promise<import("mongoose").Connection> | null;
    };
  }
}
