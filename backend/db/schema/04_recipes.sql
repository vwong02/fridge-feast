-- Drop and recreate Users table

DROP TABLE IF EXISTS recipes CASCADE;
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  serving_size  INTEGER DEFAULT 0,
  directions  VARCHAR(255)  NOT NULL,
  tags TEXT[],
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
