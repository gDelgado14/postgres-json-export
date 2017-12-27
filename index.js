require('dotenv').config()

const { Pool } = require('pg')

const dbRunner = require('./dbRunner')

const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGDATABASE,
  PGPORT
} = process.env

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT
})

dbRunner(pool)
