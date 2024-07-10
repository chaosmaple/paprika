import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

export const cards = sqliteTable("cards", {
    id: text("id").primaryKey().$defaultFn(createId),
    image: text("image"),
    name: text("name"),
    kana_name: text("kana_name"),
    card_no: text("card_no").unique(),
    product_name: text("product_name"),
    neo_standard: text("neo_standard"),
    expansion_no: text("expansion_no"),
    rarity: text("rarity"),
    side: text("side"),
    card_type: text("card_type"),
    color: text("color"),
    level: integer("level"),
    cost: integer("cost"),
    power: integer("power"),
    soul: integer("soul"),
    trigger: text("trigger"),
    special_attribute: text("special_attribute"),
    text: text("text"),
    flavor: text("flavor"),
    illustrator: text("illustrator"),
});
