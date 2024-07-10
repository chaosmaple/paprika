import Database from "bun:sqlite";
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { cards } from "../schema/card";
import path from "path";

const url = path.join(import.meta.dirname, "../../card.db");
const sqlite = new Database(url);
export const db = drizzle(sqlite, {
    schema: {
        cards
    }
});