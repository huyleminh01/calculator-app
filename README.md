# calculator-api

## Installation

```bash
npm install
```

## Running the app

### 1. Create environment file

Create *.env* file at root folder from *.env.sample* file

### 2. Create database

* Please prepare a database with a name that you like. *Ex: calculator*
* PostgreSQL version: 14

### 3. Run migration

```bash
# Build the source code first
npm run build

# Run migration up
npm run db:migrate

# Run seeder
npm run db:seed
```

### 4. Run app

```bash
# development
npm run start

# watch mode
npm run start:dev
```

### 5. Open swagger to run test api

View <http://localhost:{port}/api-doc>
