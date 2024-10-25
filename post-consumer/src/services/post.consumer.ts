import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/post";

export const postConsumer = async () => {
    const messages: any[] = [];
    let processing = false;
    try {
        await kafkaConfig.subscribeTopic("post");
        await kafkaConfig.consume(async (message) => {
            messages.push(message);
            console.log("Message received: ", message);
            if (messages.length > 100) {
                // TODO: save into database bulk insert
                processMessages();
            }
        });
        setInterval(processMessages, 5000); // run every 5 seconf
    } catch (error) {
        console.log("Error consuming message: ", error);
    }

    async function processMessages() {
        console.log("Processing message called ", processing, messages.length);
        if (messages.length > 0 && !processing) {
            processing = true;
            const batchToProcess = [...messages];
            messages.length = 0;
            try {
                await PostModel.insertMany(batchToProcess);
                console.log("Bulk insertion complete");
            } catch (error) {
                console.error("Error inserting messages: ", error);
                messages.push(...batchToProcess);
            } finally {
                processing = false;
            }
        }
    }
};