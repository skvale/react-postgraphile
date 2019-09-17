# React Postgraphile

:construction:

A React app communicating with a Postgresql database
Using Urql and Postgraphile's API generation.

```sh
    .+------+     +------+     +------+     +------+.
  .' |    .'|    /|     /|     |\     |\    |`.    | `.
 +---+--+'  |   +-+----+ |     | +----+-+   |  `+--+---+
 |   |  |   |   | |    | |     | |    | |   |   |  |   |
 | React|  <-> graphql.js| <-> Postgraphile <-> Postgresql
 |.'    | .'    |/     |/       \|     \|    `. |   `. |
 +------+'      +------    \     +------+      `+------+
                            \
                             \ +------+
                               |\     |\
                               | +----+-+
                               | |    | |
                               .Github API
                                \|     \|
                                 +------+
```

## You'll need

* [Postgresql](https://www.postgresql.org/download/)
* react-postgraphile `git clone https://github.com/skvale/react-postgraphile`

### Starting it

Start Postgres

```sh
# for MacOS
brew services start postgres
# or
# postgres -D /usr/local/var/postgres
```

Create a database:

```sh
createdb react_postgraphile
```

Populate it

```sh
psql -f database/create.sql -d react_postgraphile
```

Start Postgraphile to create a Graphql layer over the created database

```sh
yarn run postgraphile
```

You can check your Graphql out at [localhost:5000/graphql](http://localhost:5000/graphql)

Generate the Types from the running schema

```sh
yarn run types:gen
```

Run the React app in a new terminal

```sh
yarn start
```
