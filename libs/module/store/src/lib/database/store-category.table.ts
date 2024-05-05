import { varchar } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store.store_category (
//     store_category_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     store_id varchar NOT NULL,
//     category_id varchar NOT NULL,
//     CONSTRAINT store_category_pk PRIMARY KEY (store_category_id),
//     CONSTRAINT store_category_unique UNIQUE (store_id, category_id),
//     CONSTRAINT store_category_category_fk FOREIGN KEY (category_id) REFERENCES store."category"(category_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
//     CONSTRAINT store_category_store_fk FOREIGN KEY (store_id) REFERENCES store.store(store_id) ON DELETE RESTRICT ON UPDATE RESTRICT
// );
export const storeCategoryTable = storeSchema.table('category', {
    storeCategoryId: varchar('store_category_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    storeId: varchar('store_id').notNull(),
    categoryId: varchar('category_id').notNull(),
});

export type SelectStoreCategory = typeof storeCategoryTable.$inferSelect;
export type SelectStoreCategories = SelectStoreCategory[];
export type InsertStoreCategory = typeof storeCategoryTable.$inferInsert;
export type InsertStoreCategories = InsertStoreCategory[];
