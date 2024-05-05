import { varchar } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store."label" (
//     label_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     label_name varchar NOT NULL,
//     label_value varchar NOT NULL,
//     CONSTRAINT label_pk PRIMARY KEY (label_id),
//     CONSTRAINT label_unique UNIQUE (label_name)
// );
export const labelTable = storeSchema.table('label', {
    labelId: varchar('label_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    labelName: varchar('label_name').notNull().unique(),
    labelValue: varchar('label_value').notNull(),
});

export type SelectLabel = typeof labelTable.$inferSelect;
export type SelectLabels = SelectLabel[];
export type InsertLabel = typeof labelTable.$inferInsert;
export type InsertLabels = InsertLabel[];
