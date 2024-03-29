-- Drop and recreate favorites table

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
