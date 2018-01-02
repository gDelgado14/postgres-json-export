const fs = require('fs')

const toJsonQuery = async (tableName, pool) => {
  result = await pool.query(`SELECT row_to_json(${tableName}) FROM ${tableName}`)

  return {
    table_name: tableName,
    result
  }
}

const writeFileToDisk = ({ table_name, result }) => {
  const jsonResult = normalizeRows(result)

  return new Promise((resolve, reject) => {
    fs.writeFile(`./tables/${table_name}.json`, jsonResult, 'utf8', (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}

const normalizeRows = (tableResult) => JSON.stringify(tableResult.rows.map(row => row.row_to_json), null, 2)

module.exports = async (pool) => {
  const res = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE';`
  )

  const promises = res.rows.map((r) => toJsonQuery(r.table_name, pool))

  const jsonResult = await Promise.all(promises)

  await Promise.all(jsonResult.map(writeFileToDisk))

  console.log('done')

  pool.end()
}
