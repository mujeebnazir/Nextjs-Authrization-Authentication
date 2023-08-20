import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB sucessfully connected!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure mongoDB is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("something goes wrong!");
    console.log(error);
  }
}
