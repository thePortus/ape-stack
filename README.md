# ape-stack

**Fullstack Angular-PostgreSQL-ExpressJS Starter**

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.com](http://thePortus.com)

## Prerequisites
* (Linux, OSX, or Windows) Install [nodejs 8.x/npm 5.x](https://nodejs.org/en/)
* (Linux, OSX, or Windows) Install [PostgreSQL 9.x](https://www.postgresql.org/) or above

If you encounter a fatal error when npm tries to install bcrypt, here are some possible solutions...
* (Linux) Install gcc with your system  package manager, e.g. `sudo apt-get install gcc`
* (Windows or OSX) Download and install [gcc binaries](https://gcc.gnu.org/install/binaries.html) for your system
* (Windows Only) [Visual Studio Express](https://www.visualstudio.com/vs/visual-studio-express/) or any Visual Studio package with C++ compiler

## Quick Installation

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

## Full Installation

```bash
# TBD, directions for...
# Setting ENV variables
# Setting a postgres account
# Adjusting assets & config.json, conf.js, travis.yml, and other config files
# Various npm/gulp commands
```

---

## For Developers

Simply ensure your node env is production or testing and run the setup script
```bash
# Set the environment manually or in a pre-hook
export NODE_ENV=production
# This will launch gulp which will detect the change in environment and compile distribution scripts
npm run setup
```
