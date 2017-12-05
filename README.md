# ape-stack

**Fullstack Angular-PostgreSQL-ExpressJS Starter**

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.com](http://thePortus.com)

## Prerequisites
1. Install [nodejs 8+/npm](https://nodejs.org/en/)
2. Install [PostgreSQL 9.x](https://www.postgresql.org/) or above

## Installation

```bash
# grab the repo and cd into the directory
git clone https://github.com/thePortus/ape-stack.git
cd ape-stack

# install npm packages
npm install

# postinstall process will automatically collect/compile files
# and create a db as defined in config.json

# ready to go, launch the server
npm start
```

Now go to [http://localhost:3000](http://localhost:3000) in your browser to see the home page.

To change the port, simply edit `bin/www`

---

## For Developers

Simply ensure your node env is production or testing and run the setup script
```bash
# Set the environment manually or in a pre-hook
export NODE_ENV=production
# This will launch gulp which will detect the change in environment and compile distribution scripts
npm run setup
```
