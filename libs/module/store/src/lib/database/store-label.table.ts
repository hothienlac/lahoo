import { varchar } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store.store_label (
//     store_label_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     store_id varchar NOT NULL,
//     label_id varchar NOT NULL,
//     CONSTRAINT store_label_pk PRIMARY KEY (store_label_id),
//     CONSTRAINT store_label_unique UNIQUE (store_id, label_id),
//     CONSTRAINT store_label_label_fk FOREIGN KEY (label_id) REFERENCES store."label"(label_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
//     CONSTRAINT store_label_store_fk FOREIGN KEY (store_id) REFERENCES store.store(store_id) ON DELETE RESTRICT ON UPDATE RESTRICT
// );
export const storeLabelTable = storeSchema.table('label', {
    storeLabelId: varchar('store_label_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    storeId: varchar('store_id').notNull(),
    labelId: varchar('label_id').notNull(),
});

export type SelectStoreLabel = typeof storeLabelTable.$inferSelect;
export type SelectStoreLabels = SelectStoreLabel[];
export type InsertStoreLabel = typeof storeLabelTable.$inferInsert;
export type InsertStoreLabels = InsertStoreLabel[];
