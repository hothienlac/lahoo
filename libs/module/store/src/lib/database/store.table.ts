import { varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store.store (
//     store_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     store_name varchar NOT NULL,
//     about varchar NOT NULL,
//     metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
//     user_id varchar NOT NULL,
//     created_at timestamptz DEFAULT now() NOT NULL,
//     CONSTRAINT store_pk PRIMARY KEY (store_id),
//     CONSTRAINT store_unique UNIQUE (store_name),
//     CONSTRAINT store_user_fk FOREIGN KEY (user_id) REFERENCES authentication."user"(user_id) ON DELETE RESTRICT ON UPDATE RESTRICT
// );
export const storeTable = storeSchema.table('store', {
    storeId: varchar('store_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    storeName: varchar('store_name').notNull().unique(),
    about: varchar('about').notNull(),
    metadata: jsonb('metadata')
        .default(sql`'{}'::jsonb`)
        .notNull(),
    userId: varchar('user_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .default(sql`now()`)
        .notNull(),
});

export type SelectStore = typeof storeTable.$inferSelect;
export type SelectStores = SelectStore[];
export type InsertStore = typeof storeTable.$inferInsert;
export type InsertStores = InsertStore[];
