import { Elysia, t } from "elysia";
import { buildCardInfo } from "./build-card-info";
import { cards } from "../schema/card";
import { db } from "../db/handler";
import { createCard } from "../db/model";

export const wsPlugin = new Elysia()
  .post("/card", async ({ body }) => {
    const info = await buildCardInfo(body.id);
    await db.insert(cards).values(info);
    return info;
  }, {
    body: t.Object({
      id: t.String(),
    }),
    response: createCard
  });
