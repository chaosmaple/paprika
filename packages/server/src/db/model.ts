import type { Static } from "@sinclair/typebox";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { cards } from "../schema/card";
import { t } from "elysia";

export const createCard = createInsertSchema(cards);
export const selectCard = createSelectSchema(cards);
export const selectCardFilter = t.Partial(t.Pick(selectCard, [
    "name",
    "neo_standard",
    "expansion_no",
    "rarity",
    "side",
    "card_type",
    "color",
    "level",
    "cost",
    "power",
    "soul",
    "trigger",
    "special_attribute",
]));

export type InsertCard = Static<typeof createCard>;
export type SelectCard = Static<typeof selectCard>;
export type SelectCardFilter = Static<typeof selectCardFilter>;
