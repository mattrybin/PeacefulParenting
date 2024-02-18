CREATE TABLE
   IF NOT EXISTS questions (
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT null,
      id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      body TEXT,
      view_count INT DEFAULT 0,
      vote_count INT DEFAULT 0,
      answer_count INT DEFAULT 0
   );

CREATE TRIGGER update_modified_time BEFORE
UPDATE ON questions FOR EACH ROW EXECUTE PROCEDURE update_modified_column ();