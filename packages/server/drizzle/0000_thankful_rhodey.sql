CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`image` text,
	`name` text,
	`kana_name` text,
	`card_no` text,
	`product_name` text,
	`neo_standard` text,
	`expansion_no` text,
	`rarity` text,
	`side` text,
	`card_type` text,
	`color` text,
	`level` integer,
	`cost` integer,
	`power` integer,
	`soul` integer,
	`trigger` text,
	`special_attribute` text,
	`text` text,
	`flavor` text,
	`illustrator` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cards_card_no_unique` ON `cards` (`card_no`);