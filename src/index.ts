import { Elysia, t } from "elysia";
import { wsPlugin } from "./weib-schwarz";

const app = new Elysia()
  .group("/api", (app) => 
    app.use(wsPlugin)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

app.handle(new Request('http://localhost:3000/api/card', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: "Fkz/W65-P02&l" }),
}))
  .then((res) => res.json())
  .then(console.log);