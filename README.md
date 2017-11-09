# ape-stack

**Fullstack Angular-PostgreSQL-ExpressJS-NodeJS Starter**

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.com](http://thePortus.com)

### Prerequisites
1. Install [nodejs 8+/npm](https://nodejs.org/en/)
2. Install [PostgreSQL 9.x](https://www.postgresql.org/) or above

### Installation
1. Install gulp `npm install gulp-cli -g`
2. Clone this repository `git clone https://github.com/thePortus/eleusis-node.git`
3. Move inside the repo `cd eleusis-node`
4. Install local dependencies `npm install`
5. Move client-side dependencies with gulp `gulp`
6. Create databases with
    1. `createdb ape-dev`,
    2. `createdb ape-test`
    3. `createdb ape-production`
    4. or whatever you set in config.json
7. Migrate and seed the environment database (defaults to development)
    1. `sequelize db:migrate`
    2. `sequelize db:seed:all`
8. Start the server `npm start`
9. Go to `localhost:3000`
