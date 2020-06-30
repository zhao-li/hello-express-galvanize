DROP TABLE IF EXISTS students;
CREATE TABLE students (
  id SERIAL,
  name varchar(255),
  username varchar(255),
  email varchar(255),
  PRIMARY KEY (id)
);

BEGIN WORK;
LOCK TABLE students IN SHARE MODE;
INSERT INTO students VALUES (1, 'Brandon'),(2, 'Jeff');
ALTER SEQUENCE students_id_seq RESTART WITH 3;
COMMIT WORK;


DROP TABLE IF EXISTS grades;
CREATE TABLE grades (
  id SERIAL,
  student_id SERIAL,
  math varchar(255),
  science varchar(255),
  language_arts varchar(255),
  chemistry varchar(255),
  PRIMARY KEY (id)
);

BEGIN WORK;
LOCK TABLE grades IN SHARE MODE;
INSERT INTO grades VALUES (DEFAULT, 1, 'A+', 'A-', 'A', ''),(DEFAULT, 2, 'A-', 'A', 'A-', '');
ALTER SEQUENCE grades_id_seq RESTART WITH 3;
COMMIT WORK;

