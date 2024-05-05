import { varchar } from 'drizzle-orm/pg-core';
import { storeSchema } from './store.schema';
import { sql } from 'drizzle-orm';

// CREATE TABLE store."category" (
//     category_id varchar DEFAULT gen_random_uuid() NOT NULL,
//     category_name varchar NOT NULL,
//     description varchar NOT NULL,
//     CONSTRAINT category_pk PRIMARY KEY (category_id),
//     CONSTRAINT category_unique UNIQUE (category_name)
// );
export const categoryTable = storeSchema.table('category', {
    categoryId: varchar('category_id')
        .default(sql`gen_random_uuid()`)
        .notNull(),
    categoryName: varchar('category_name').notNull().unique(),
    description: varchar('description').notNull(),
});

export type SelectCategory = typeof categoryTable.$inferSelect;
export type SelectCategories = SelectCategory[];
export type InsertCategory = typeof categoryTable.$inferInsert;
export type InsertCategories = InsertCategory[];
