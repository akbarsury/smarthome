PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_connected-peers` (
	`peer` text PRIMARY KEY NOT NULL,
	`user` text DEFAULT '' NOT NULL,
	`createdAt` text NOT NULL,
	`expiredAt` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_connected-peers`("peer", "user", "createdAt", "expiredAt") SELECT "peer", "user", "createdAt", "expiredAt" FROM `connected-peers`;--> statement-breakpoint
DROP TABLE `connected-peers`;--> statement-breakpoint
ALTER TABLE `__new_connected-peers` RENAME TO `connected-peers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;