CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE authors (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(255),
  birth_date DATE
);

CREATE TABLE books (
  id             SERIAL PRIMARY KEY,
  author_id      UUID REFERENCES authors(id) ON DELETE CASCADE,
  title          VARCHAR(255),
  price          DECIMAL(10,2),
  released_at    DATE
);

INSERT INTO authors (name, birth_date)
VALUES ('Mary Shelley', '1797-08-30');

INSERT INTO books (author_id, title, price, released_at)
VALUES (
  (SELECT id FROM authors LIMIT 1),
  'Frankenstein',
  9.99,
  '1818-01-01'
);
