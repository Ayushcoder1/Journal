import { Pool } from 'pg';

const connection : string = "postgresql://blog:newayush123@localhost:5431/blog";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connection,
  min: 1,
  max: 10,             
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 20000, 
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

async function addTables(){
    await pool.query(`
        CREATE TABLE User {
            id VARCHAR(300) 
        }
    `);
}

export default pool;
