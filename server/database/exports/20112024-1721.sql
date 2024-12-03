PRAGMA defer_foreign_keys = TRUE;
CREATE TABLE [connected-peers] (
    "peer" text PRIMARY KEY,
    "user" text,
    "createdAt" text,
    "expiredAt" text
);
CREATE TABLE [controled-items] (
    "name" text,
    "label" text PRIMARY KEY,
    "type" text DEFAULT "switch",
    "pushTime" integer DEFAULT 1000,
    "forceOn" integer DEFAULT 1,
    "forceOff" integer DEFAULT 0,
    "icon" text DEFAULT "ion:switch",
    "order" integer
);