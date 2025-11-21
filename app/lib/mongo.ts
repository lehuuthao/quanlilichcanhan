import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectDatabase() {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI!);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default connectDatabase;
