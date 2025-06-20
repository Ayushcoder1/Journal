import { Pool } from 'pg';

const connection : string = "postgresql://blog:newayush123@localhost:5431/blog";

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

    // await pool.query(`
    //     CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    // `);

    // await pool.query(`
    //     CREATE TABLE Users (
    //         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    //         email VARCHAR(60) UNIQUE NOT NULL,
    //         name VARCHAR(40),
    //         password VARCHAR(40) NOT NULL
    //     );
    // `);

//     await pool.query(`
//         CREATE TABLE Post (
//             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//             title VARCHAR(200) NOT NULL,
//             content TEXT,
//             published BOOLEAN DEFAULT FALSE,
//             authorId UUID,
//             FOREIGN KEY(authorId) REFERENCES Users(id) ON DELETE CASCADE
//         );
//     `)
// }

export default pool;
