// export {};

// declare global {
//   interface Global {
//     mongooseGlobal?: {
//       conn: import("mongoose").Connection | null;
//       promise: Promise<import("mongoose").Connection> | null;
//     };
//   }
// }

// global.d.ts
import mongoose from "mongoose";

interface MongooseGlobal {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: MongooseGlobal | undefined;
}

export {};
