import Knex from 'knex';
import cfg  from './knexfile.js';

const pg = Knex(cfg.pgSrc);
const ms = Knex(cfg.mssqlTgt);

const BATCH = 1000;

try {
  /* 1. mål-schema i SQL Server */
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
  )`);

  /* 2. data-kopi */
  for (let off = 0, rows;; off += BATCH) {
    rows = await pg.select('*').from('authors').limit(BATCH).offset(off);
    if (!rows.length) break;
    await ms('authors').insert(rows);
  }

  for (let off = 0, rows;; off += BATCH) {
    rows = await pg.select('*').from('books').limit(BATCH).offset(off);
    if (!rows.length) break;
    const rowsNoId = rows.map(({ id, ...rest }) => rest); // IDENTITY genereres
    await ms('books').insert(rowsNoId);
  }

  console.log('✅  Migration completed');
} catch (e) {
  console.error(e);
} finally {
  await pg.destroy();
  await ms.destroy();
}
