import { varchar, jsonb } from 'drizzle-orm/pg-core';
import { configSchema } from './config.schema';

// CREATE TABLE config.config (
//     "key" varchar NOT NULL,
//     value jsonb NOT NULL,
//     CONSTRAINT config_pk PRIMARY KEY (key)
// );
export const configTable = configSchema.table('config', {
    key: varchar('key').notNull().primaryKey(),
    value: jsonb('value').notNull(),
});

export type SelectConfig = typeof configTable.$inferSelect;
export type SelectConfigs = SelectConfig[];
export type InsertConfig = typeof configTable.$inferInsert;
export type InsertConfigs = InsertConfig[];
