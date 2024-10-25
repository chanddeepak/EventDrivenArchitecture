import kafkaConfig from "./src/config/kafka.config";

export const init = async () => {
    try {
        await kafkaConfig.connect();
        await kafkaConfig.createTopic("post");
        console.log("Service created");
    } catch (error) {
        console.log("Error creating services: ", error);
        process.exit(1);
    }
}