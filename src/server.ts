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