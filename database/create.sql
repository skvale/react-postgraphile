create schema react_postgraphile;
create schema react_postgraphile_private;
create extension if not exists "pgcrypto";

create table react_postgraphile.person (
  id               serial primary key,
  first_name       text not null check (char_length(first_name) < 80),
  last_name        text check (char_length(last_name) < 80),
  github_auth      text,
  created_at       timestamp default now()
);

comment on table react_postgraphile.person is 'A user of the site.';
comment on column react_postgraphile.person.id is 'The primary unique identifier for the person.';
comment on column react_postgraphile.person.first_name is 'The person’s first name.';
comment on column react_postgraphile.person.last_name is 'The person’s last name.';
comment on column react_postgraphile.person.created_at is 'The time this person was created.';

create function react_postgraphile.person_full_name(person react_postgraphile.person) returns text as $$
  select person.first_name || ' ' || person.last_name
$$ language sql stable;

comment on function react_postgraphile.person_full_name(react_postgraphile.person) is 'A person’s full name which is a concatenation of their first and last name.';

create table react_postgraphile_private.person_account (
  person_id        integer primary key references react_postgraphile.person(id) on delete cascade,
  email            text not null unique check (email ~* '^.+@.+\..+$'),
  password_hash    text not null
);

comment on table react_postgraphile_private.person_account is 'Private information about a person’s account.';
comment on column react_postgraphile_private.person_account.person_id is 'The id of the person associated with this account.';
comment on column react_postgraphile_private.person_account.email is 'The email address of the person.';
comment on column react_postgraphile_private.person_account.password_hash is 'An opaque hash of the person’s password.';

create function react_postgraphile.register_person(
  first_name text,
  last_name text,
  email text,
  password text
) returns react_postgraphile.person as $$
declare
  person react_postgraphile.person;
begin
  insert into react_postgraphile.person (first_name, last_name) values
    (first_name, last_name)
    returning * into person;

  insert into react_postgraphile_private.person_account (person_id, email, password_hash) values
    (person.id, email, crypt(password, gen_salt('bf')));

  return person;
end;
$$ language plpgsql strict security definer;

comment on function react_postgraphile.register_person(text, text, text, text) is 'Registers a single user and creates an account in our site.';

create type react_postgraphile.jwt_token as (
  role text,
  person_id integer
);

create function react_postgraphile.authenticate(
  email text,
  password text
) returns react_postgraphile.jwt_token as $$
declare
  account react_postgraphile_private.person_account;
begin
  select a.* into account
  from react_postgraphile_private.person_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('react_postgraphile_person', account.person_id)::react_postgraphile.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function react_postgraphile.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions.';

create function react_postgraphile.current_person() returns react_postgraphile.person as $$
  select *
  from react_postgraphile.person
  where id = current_setting('jwt.claims.person_id')::integer
$$ language sql stable;

comment on function react_postgraphile.current_person() is 'Gets the person who was identified by our JWT.';

create role react_postgraphile login password 'velvet';
create role react_postgraphile_anonymous;
grant react_postgraphile_anonymous to react_postgraphile_anonymous;

create role react_postgraphile_person;
grant react_postgraphile_person to react_postgraphile_anonymous;

alter default privileges revoke execute on functions from public;


grant select on table react_postgraphile.person to react_postgraphile_anonymous, react_postgraphile_person;
grant update, delete on table react_postgraphile.person to react_postgraphile_person;

grant execute on function react_postgraphile.person_full_name(react_postgraphile.person) to react_postgraphile_anonymous, react_postgraphile_person;
grant execute on function react_postgraphile.authenticate(text, text) to react_postgraphile_anonymous, react_postgraphile_person;
grant execute on function react_postgraphile.current_person() to react_postgraphile_anonymous, react_postgraphile_person;
grant execute on function react_postgraphile.register_person(text, text, text, text) to react_postgraphile_anonymous;

create policy update_person on react_postgraphile.person for update to react_postgraphile_person
  using (id = current_setting('jwt.claims.person_id')::integer);

create policy delete_person on react_postgraphile.person for delete to react_postgraphile_person
  using (id = current_setting('jwt.claims.person_id')::integer);

ALTER DATABASE react_postgraphile set jwt.claims.person_id to 0;

create table react_postgraphile.pr_note (
  pull_request     varchar(32) primary key,
  content          text not null check (char_length(content) < 4800),
  created_at       timestamp default now()
);

comment on table react_postgraphile.pr_note is 'Notes on a pull request.';
comment on column react_postgraphile.pr_note.pull_request is 'The pr_notes key and pull request uuid in Github.';
comment on column react_postgraphile.pr_note.content is 'The pr_notes content.';
comment on column react_postgraphile.pr_note.created_at is 'The time this pr_note was created.';

grant select on table react_postgraphile.pr_note to react_postgraphile_anonymous, react_postgraphile_person;
grant insert, update, delete on table react_postgraphile.pr_note to react_postgraphile_person;

create policy all_pr_note on react_postgraphile.pr_note for all to react_postgraphile_person
  using (id = current_setting('jwt.claims.person_id')::integer);

grant usage on schema react_postgraphile to react_postgraphile_anonymous, react_postgraphile_person;
grant usage, select on all sequences in schema react_postgraphile to react_postgraphile_anonymous, react_postgraphile_person;