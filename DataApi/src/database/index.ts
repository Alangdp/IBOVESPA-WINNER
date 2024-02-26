import { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MONGO-DB

export class MongooConnection {
  static mongoose = new Mongoose();

  private static verifyConnection() {
    return MongooConnection.mongoose.connection.readyState;
  }

  static async makeConnection() {
    if (MongooConnection.verifyConnection() === 1)
      return MongooConnection.mongoose
    await MongooConnection.mongoose.connect(process.env.MONGOOSE_URI as string);
    return MongooConnection.mongoose
  }
}
