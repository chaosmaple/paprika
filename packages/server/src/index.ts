import { Elysia, t } from "elysia";
import { wsPlugin } from "./weib-schwarz";
import { swagger } from '@elysiajs/swagger'

export const app = new Elysia({ prefix: "/api" })
  .use(swagger())
  .use(wsPlugin)
  .get("/test", ({ query }) => {
    return `Hello, ${query.number}`;
  }, {
    query: t.Object({
      number: t.Numeric()
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
