import Knex from 'knex';
import cfg from './knexfile.js';   // default-import

const pg = Knex(cfg.pgSrc);      // skal matche navnet i knexfile
const ms = Knex(cfg.mssqlTgt);   // dto.


const BATCH = 1_000;

try {
    await pg.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    const exists = await pg.schema.hasTable('authors');
    if (!exists) {
    await pg.schema.createTable('authors', t => {
        t.uuid('id').primary().defaultTo(pg.raw('uuid_generate_v4()'));
        t.string('name');
        t.date('birth_date');
    });
    await pg.schema.createTable('books', t => {
        t.increments('id').primary();
        t.uuid('author_id').references('authors.id').onDelete('CASCADE');
        t.string('title');
        t.decimal('price', 10, 2);
        t.date('released_at');
    });
    console.log('Seed-schema oprettet i kilde-Postgres (ingen data endnu)');
    }


    /* 1. schema sync -------------------------------------------------- */
    await ms.schema.dropTableIfExists('books');
    await ms.schema.dropTableIfExists('authors');

    await ms.raw(`CREATE TABLE authors (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(255),
    birth_date DATE
    )`);

    await ms.raw(`CREATE TABLE books (
    id INT IDENTITY(1,1) PRIMARY KEY,
    author_id UNIQUEIDENTIFIER NOT NULL,
    title NVARCHAR(255),
    price DECIMAL(10,2),
    released_at DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
    );`);

    for (let off = 0, rows; ; off += BATCH) {
        rows = await pg.select('*')
            .from('authors')
            .limit(BATCH)
            .offset(off);
        if (!rows.length) break;
        await my('authors').insert(rows);
    }

    for (let off = 0, rows; ; off += BATCH) {
        rows = await pg.select('*')
            .from('books')
            .limit(BATCH)
            .offset(off);
        if (!rows.length) break;

        const rowsNoId = rows.map(({ id, ...rest }) => rest);
        await my('books').insert(rowsNoId);
    }

    console.log('Mirgration completed')
} catch (err) {
    console.error(err);
} finally {
    await pg.destroy();
    await my.destroy();
}