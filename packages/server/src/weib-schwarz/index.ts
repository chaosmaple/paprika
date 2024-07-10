import { Elysia, t } from "elysia";
import { buildCardInfo } from "./build-card-info";
import { cards } from "../schema/card";
import { db } from "../db/handler";
import { createCard, selectCard, selectCardFilter, SelectCardFilter } from "../db/model";
import { eq, and } from "drizzle-orm";
import { map, compact } from "lodash";

;

export const wsPlugin = new Elysia()
  .get("/cards", async ({ query }) => {
    // todo: currently there's some bug for query type casting
    const condition = and(
      ...compact(
        map(query, (v, k) => {
          if (!v) return null;
          return eq(cards[k as keyof SelectCardFilter], v)
        })
      )
    );
    const result = await db.select().from(cards).where(condition);
    return result;
  }, {
    query: selectCardFilter,
    response: t.Array(selectCard)
  })
  .get("/card", async ({ query }) => {
    const result = await db.select().from(cards).where(eq(cards.card_no, query.card_no));
    if (result.length === 0) return null;
    return result[0];
  }, {
    query: t.Object({
      card_no: t.String()
    }),
    response: t.Nullable(selectCard)
  })
  .post("/card/add", async ({ body }) => {
    const info = await buildCardInfo(body.id);
    await db.insert(cards).values(info);
    return info;
  }, {
    body: t.Object({
      id: t.String(),
    }),
    response: createCard
  });
