CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  birth_date DATE
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  title VARCHAR(255),
  price DECIMAL(10,2),
  released_at DATE
);

INSERT INTO authors (name, birth_date) VALUES
  ('Mary Shelley',  DATE '1797-08-30'),
  ('Douglas Adams', DATE '1952-03-11');

INSERT INTO books (author_id, title, price, released_at)
SELECT id, 'Frankenstein',                       9.99, DATE '1818-01-01'
  FROM authors WHERE name='Mary Shelley'
UNION ALL
SELECT id, 'The Hitchhiker''s Guide to the Galaxy', 12.50, DATE '1979-10-12'
  FROM authors WHERE name='Douglas Adams';
