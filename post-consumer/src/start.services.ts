import { connectToDb } from "./config/db.config";
import kafkaConfig from "./config/kafka.config";
import { postConsumer } from "./services/post.consumer";

export const init = async () => {
    try {
        await connectToDb();
        await kafkaConfig.connect();
        await postConsumer();
        console.log("Service created");
    } catch (error) {
        console.log("Error creating services: ", error);
        process.exit(1);
    }
}