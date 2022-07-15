// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'crud',
  password: 'Mysqlsenha23-42',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

// pool.promise().query('select * from alunos')
// .then ( (result) => { 
//     console.log(result) 
// });
