const mysql = require('mysql')

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const con = mysql.createConnection(config)
con.connect((err) => {
    if (err)
    {
       console.log('Error in connecting to the database: '+err)
       process.exit(1)
    }
    console.log('Connected to the database');
 })

 
 
module.exports = con;