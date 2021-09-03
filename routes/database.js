const mysql = require('mysql')

const config = {
    connectionLimit : 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const pool = mysql.createPool(config);

 module.exports = {
     executeQuery : async (query) => {

        return await new Promise((resolve, reject) => {
            try {
                pool.getConnection((error, connection) => {
                    if (error || connection == null) throw error;
                    
                    connection.query(query,  (error, results, fields) => {
                        connection.release();

                        if (error) throw(error);   //query error 
                        resolve(results)
                    });
                });
            }
            catch (error) {
                reject(error)
            }
        })     
     }
    
 };