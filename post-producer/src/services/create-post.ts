import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import kafkaConfig from "../config/kafka.config";

const app = new Hono();

app.post("/create-post", zValidator("json", z.object({
        title: z.string(),
        content: z.string(),
    })), async (c) => {
        const { title, content } = c.req.valid("json");
        try {
            await kafkaConfig.sentToTopic("post", JSON.stringify({ title, content }));
            console.log("Data sent to topic");
            return c.json({ message: "Post created" }, 200);
        } catch (error) {
            console.log("Error sending message: ", error);
            return c.json({ error: "Error sending message" }, 500);
        }
});

export default app;