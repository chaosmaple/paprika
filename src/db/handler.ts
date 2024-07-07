import Database from "bun:sqlite";
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { cards } from "../schema/card";

const sqlite = new Database("card.db");
export const db = drizzle(sqlite, {
    schema: {
        cards
    }
});