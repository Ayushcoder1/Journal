import { Pool } from 'pg';

// const connection : string = "postgresql://blog:newayush123@localhost:5431/blog";
const connection: string = "postgresql://blog:newayush123@13.235.78.242:5431/blog";

const pool = new Pool({
  connectionString: connection,
  min: 1,
  max: 10,             
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 20000, 
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export default pool;
