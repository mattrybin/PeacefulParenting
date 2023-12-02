CREATE TABLE
   IF NOT EXISTS posts (
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT null,
      id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      view_count INT,
      vote_count INT,
      answer_count INT
   );

CREATE TRIGGER update_modified_time BEFORE
UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_modified_column ();