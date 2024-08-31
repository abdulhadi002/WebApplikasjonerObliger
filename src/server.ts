import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono()


interface Project {
    id: number;
    project_name: string;
    description: string;
    image_src: string;
}

app.use("/*", cors());

app.use("/statics/*", serveStatic({root: "./"}));

app.get("/json", async (c) => {
    const data = await readFile("./data.json", "utf-8");
    return c.json(JSON.parse(data));
});


const port = app.listen({ port: 4023});

console.log("IT'S WORKING");

serve({
    fetch: app.fetch,
    port,
});