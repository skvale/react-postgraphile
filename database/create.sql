CREATE SCHEMA react_postgraphile;

CREATE SCHEMA react_postgraphile_private;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE react_postgraphile.person (
  id serial PRIMARY KEY,
  first_name text NOT NULL CHECK (char_length(first_name) < 80),
  last_name text CHECK (char_length(last_name) < 80),
  github_auth text,
  created_at timestamp DEFAULT now()
);

COMMENT ON TABLE react_postgraphile.person IS 'A user of the site.';

COMMENT ON COLUMN react_postgraphile.person.id IS 'The primary unique identifier for the person.';

COMMENT ON COLUMN react_postgraphile.person.first_name IS 'The person’s first name.';

COMMENT ON COLUMN react_postgraphile.person.last_name IS 'The person’s last name.';

COMMENT ON COLUMN react_postgraphile.person.created_at IS 'The time this person was created.';

CREATE FUNCTION react_postgraphile.person_full_name (person react_postgraphile.person)
  RETURNS text
  AS $$
  SELECT
    person.first_name || ' ' || person.last_name
$$
LANGUAGE sql
STABLE;

COMMENT ON FUNCTION react_postgraphile.person_full_name (react_postgraphile.person) IS 'A person’s full name which is a concatenation of their first and last name.';

CREATE TABLE react_postgraphile_private.person_account (
  person_id integer PRIMARY KEY REFERENCES react_postgraphile.person (id) ON DELETE CASCADE, email text NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$'),
  password_hash text NOT NULL
);

COMMENT ON TABLE react_postgraphile_private.person_account IS 'Private information about a person’s account.';

COMMENT ON COLUMN react_postgraphile_private.person_account.person_id IS 'The id of the person associated with this account.';

COMMENT ON COLUMN react_postgraphile_private.person_account.email IS 'The email address of the person.';

COMMENT ON COLUMN react_postgraphile_private.person_account.password_hash IS 'An opaque hash of the person’s password.';

CREATE FUNCTION react_postgraphile.register_person (first_name text, last_name text, email text, PASSWORD text)
  RETURNS react_postgraphile.person
  AS $$
DECLARE
  person react_postgraphile.person;
BEGIN
  INSERT INTO react_postgraphile.person (first_name, last_name)
  VALUES (first_name, last_name)
RETURNING
  * INTO person;
  INSERT INTO react_postgraphile_private.person_account (person_id, email, password_hash)
  VALUES (person.id, email, crypt(PASSWORD, gen_salt('bf')));
  RETURN person;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;

COMMENT ON FUNCTION react_postgraphile.register_person (text, text, text, text) IS 'Registers a single user and creates an account in our site.';

CREATE TYPE react_postgraphile.jwt_token AS (
  ROLE text,
  person_id integer
);

CREATE FUNCTION react_postgraphile.authenticate (email text, PASSWORD text)
  RETURNS react_postgraphile.jwt_token
  AS $$
DECLARE
  account react_postgraphile_private.person_account;
BEGIN
  SELECT
    a.* INTO account
  FROM
    react_postgraphile_private.person_account AS a
  WHERE
    a.email = $1;
  IF account.password_hash = crypt(PASSWORD, account.password_hash) THEN
    RETURN ('react_postgraphile_person',
      account.person_id)::react_postgraphile.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;
$$
LANGUAGE plpgsql
STRICT
SECURITY DEFINER;

COMMENT ON FUNCTION react_postgraphile.authenticate (text, text) IS 'Creates a JWT token that will securely identify a person and give them certain permissions.';

CREATE FUNCTION react_postgraphile.current_person ()
  RETURNS react_postgraphile.person
  AS $$
  SELECT
    *
  FROM
    react_postgraphile.person
  WHERE
    id = current_setting('jwt.claims.person_id')::integer
$$
LANGUAGE sql
STABLE;

COMMENT ON FUNCTION react_postgraphile.current_person () IS 'Gets the person who was identified by our JWT.';

CREATE ROLE react_postgraphile LOGIN PASSWORD 'velvet';

CREATE ROLE react_postgraphile_anonymous;

GRANT react_postgraphile_anonymous TO react_postgraphile_anonymous;

CREATE ROLE react_postgraphile_person;

GRANT react_postgraphile_person TO react_postgraphile_anonymous;

ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

GRANT SELECT ON TABLE react_postgraphile.person TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT UPDATE, DELETE ON TABLE react_postgraphile.person TO react_postgraphile_person;

GRANT EXECUTE ON FUNCTION react_postgraphile.person_full_name (react_postgraphile.person) TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT EXECUTE ON FUNCTION react_postgraphile.authenticate (text, text) TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT EXECUTE ON FUNCTION react_postgraphile.current_person () TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT EXECUTE ON FUNCTION react_postgraphile.register_person (text, text, text, text) TO react_postgraphile_anonymous;

CREATE POLICY update_person ON react_postgraphile.person FOR UPDATE TO react_postgraphile_person USING (id = current_setting('jwt.claims.person_id')::integer);

CREATE POLICY delete_person ON react_postgraphile.person FOR DELETE TO react_postgraphile_person USING (id = current_setting('jwt.claims.person_id')::integer);

ALTER DATABASE react_postgraphile SET jwt.claims.person_id TO 0;

CREATE TABLE react_postgraphile.pr_note (
  pull_request varchar(32) PRIMARY KEY,
  content text NOT NULL CHECK (char_length(content) < 4800),
  created_at timestamp DEFAULT now()
);

COMMENT ON TABLE react_postgraphile.pr_note IS 'Notes on a pull request.';

COMMENT ON COLUMN react_postgraphile.pr_note.pull_request IS 'The pr_notes key and pull request uuid in Github.';

COMMENT ON COLUMN react_postgraphile.pr_note.content IS 'The pr_notes content.';

COMMENT ON COLUMN react_postgraphile.pr_note.created_at IS 'The time this pr_note was created.';

GRANT SELECT ON TABLE react_postgraphile.pr_note TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT INSERT, UPDATE, DELETE ON TABLE react_postgraphile.pr_note TO react_postgraphile_person;

CREATE POLICY all_pr_note ON react_postgraphile.pr_note FOR ALL TO react_postgraphile_person USING (id = current_setting('jwt.claims.person_id')::integer);

GRANT usage ON SCHEMA react_postgraphile TO react_postgraphile_anonymous, react_postgraphile_person;

GRANT usage, SELECT ON ALL sequences IN SCHEMA react_postgraphile TO react_postgraphile_anonymous, react_postgraphile_person;

