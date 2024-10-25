import mongoose from "mongoose";

export const connectToDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/eda-test").then(() => {
        console.log("Connected to mongodb");
    }).catch((error) => {
        console.error("Error connecting to database: ", error);
    });
}