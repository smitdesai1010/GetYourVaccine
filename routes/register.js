const express = require('express')
const db = require(__dirname+'/database')
const router = express();


//-----------------Route---------------------
router.use(express.json())
router.post('/', (req, res) => {

   const data = req.body;
   
   const usernamequery = `SELECT username from users where username='${data.username}'`
   
   db.executeQuery(usernamequery)
   .then(usernamequeryres => {

      if (usernamequeryres.length != 0) {
         res.sendStatus(400);
      }

      else {
         let sqlquery = `INSERT into users(username,phone,password,pincode,age,covaxin,covishield) VALUES ('${data.username}','${data.phone}','${data.password}',${data.pincode},${data.age},${data.covaxin},${data.covishield})`
         db.executeQuery(sqlquery);
         res.sendStatus(200);
      }   
   })
  
})

module.exports = router;
