CREATE TABLE `civicResources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(160) NOT NULL,
	`kind` enum('guide','tool','portal','field_note','case_update') NOT NULL,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`title` varchar(320) NOT NULL,
	`summary` text NOT NULL,
	`body` text,
	`category` varchar(128),
	`jurisdiction` varchar(128),
	`sourceUrl` varchar(2048),
	`sourceLabel` varchar(256),
	`verifiedAt` timestamp,
	`publishedAt` timestamp,
	`displayOrder` int NOT NULL DEFAULT 0,
	`isFeatured` int NOT NULL DEFAULT 0,
	`authorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `civicResources_id` PRIMARY KEY(`id`),
	CONSTRAINT `civicResources_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `resourceSources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resourceId` int NOT NULL,
	`label` varchar(320) NOT NULL,
	`url` varchar(2048) NOT NULL,
	`publisher` varchar(256),
	`sourceType` varchar(128),
	`checkedAt` timestamp,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resourceSources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settingKey` varchar(128) NOT NULL,
	`settingValue` text NOT NULL,
	`updatedById` int,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `siteSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `siteSettings_settingKey_unique` UNIQUE(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `civicResources` ADD CONSTRAINT `civicResources_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `resourceSources` ADD CONSTRAINT `resourceSources_resourceId_civicResources_id_fk` FOREIGN KEY (`resourceId`) REFERENCES `civicResources`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `siteSettings` ADD CONSTRAINT `siteSettings_updatedById_users_id_fk` FOREIGN KEY (`updatedById`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `civic_resources_public_index` ON `civicResources` (`status`,`kind`,`displayOrder`);--> statement-breakpoint
CREATE INDEX `civic_resources_author_index` ON `civicResources` (`authorId`);--> statement-breakpoint
CREATE INDEX `resource_sources_resource_index` ON `resourceSources` (`resourceId`,`displayOrder`);