import { varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store.branch (
//    branch_id varchar DEFAULT gen_random_uuid() NOT NULL,
//    store_id varchar NOT NULL,
//    location_description varchar NOT NULL,
//    address jsonb DEFAULT '{}'::jsonb NOT NULL,
//    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
//    created_at timestamptz DEFAULT now() NOT NULL,
//    CONSTRAINT branch_pk PRIMARY KEY (branch_id),
//    CONSTRAINT branch_store_fk FOREIGN KEY (store_id) REFERENCES store.store(store_id) ON DELETE RESTRICT ON UPDATE RESTRICT
// );
export const branchTable = storeSchema.table('store', {
    branchId: varchar('branch_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    storeId: varchar('store_id').notNull(),
    locationDescription: varchar('location_description').notNull(),
    address: jsonb('address')
        .default(sql`'{}'::jsonb`)
        .notNull(),
    metadata: jsonb('metadata')
        .default(sql`'{}'::jsonb`)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .default(sql`now()`)
        .notNull(),
});

export type SelectBranch = typeof branchTable.$inferSelect;
export type SelectBranches = SelectBranch[];
export type InsertBranch = typeof branchTable.$inferInsert;
export type InsertBranches = InsertBranch[];
