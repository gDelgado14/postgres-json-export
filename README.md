# postgres-json-export

Maps through all postgres tables and writes a `.json` file to disk for each table.

The output format is a JSON array.

## Usage:


```
> touch .env
```

Add the following environment variables to your `.env`:

```
PGUSER
PGPASSWORD
PGHOST
PGDATABASE
PGPORT
```

Then:

```
> npm run convert
```

You should now have a `tables` directory with many `.json` files
