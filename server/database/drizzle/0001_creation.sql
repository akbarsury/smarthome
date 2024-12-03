PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_connected-peers` (
	`peer` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`createdAt` text NOT NULL,
	`expiredAt` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_connected-peers`("peer", "user", "createdAt", "expiredAt") SELECT "peer", "user", "createdAt", "expiredAt" FROM `connected-peers`;--> statement-breakpoint
DROP TABLE `connected-peers`;--> statement-breakpoint
ALTER TABLE `__new_connected-peers` RENAME TO `connected-peers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_controled-items` (
	`name` text NOT NULL,
	`label` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT ('switch') NOT NULL,
	`pushTime` integer DEFAULT 1000 NOT NULL,
	`forceOn` integer DEFAULT 1 NOT NULL,
	`forceOff` integer DEFAULT 0 NOT NULL,
	`icon` text DEFAULT ('ion:switch') NOT NULL,
	`order` integer
);
--> statement-breakpoint
INSERT INTO `__new_controled-items`("name", "label", "type", "pushTime", "forceOn", "forceOff", "icon", "order") SELECT "name", "label", "type", "pushTime", "forceOn", "forceOff", "icon", "order" FROM `controled-items`;--> statement-breakpoint
DROP TABLE `controled-items`;--> statement-breakpoint
ALTER TABLE `__new_controled-items` RENAME TO `controled-items`;