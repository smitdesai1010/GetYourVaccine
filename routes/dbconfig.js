const mysql = require('mysql')

const config = {
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "getyourvaccinedb"
}

const con = mysql.createConnection(config)
con.connect((err) => {
    if (err)
    {
       console.log('Error in connecting to the database: '+err)
    }
    console.log('Connected to the database');
 })

 
 
module.exports = con;