CREATE TABLE
  IF NOT EXISTS comments (
    id BIGINT DEFAULT public.id_generator () PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT null,
    post_id BIGINT REFERENCES posts (id),
    body TEXT
  );

CREATE TRIGGER update_modified_time BEFORE
UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_modified_column ();