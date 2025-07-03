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

// async function addTables(){
//     await pool.query(`
//         CREATE TABLE Users (
//             id BIGSERIAL PRIMARY KEY,
//             email VARCHAR(60) UNIQUE NOT NULL,
//             name VARCHAR(40),
//             password VARCHAR(40) NOT NULL
//         );
//     `);
//     await pool.query(`
//         CREATE TABLE Post (
//             id BIGSERIAL PRIMARY KEY,
//             title VARCHAR(200) NOT NULL,
//             content TEXT,
//             published BOOLEAN DEFAULT FALSE,
//             authorId BIGINT,
//             reads BIGINT,
//             created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY(authorId) REFERENCES Users(id) ON DELETE CASCADE
//         );
//     `)
// }

// addTables();

export default pool;
