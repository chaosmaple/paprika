import type { Static } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";
import { cards } from "../schema/card";

export const createCard = createInsertSchema(cards);

export type InsertCard = Static<typeof createCard>;