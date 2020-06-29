DROP TABLE IF EXISTS students;
CREATE TABLE students (
  id SERIAL,
  name varchar(255),
  PRIMARY KEY (id)
);

BEGIN WORK;
LOCK TABLE students IN SHARE MODE;
INSERT INTO students VALUES (1, 'Brandon'),(2, 'Jeff');
COMMIT WORK;
