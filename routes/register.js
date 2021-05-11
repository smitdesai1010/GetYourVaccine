const express = require('express')
const db = require(__dirname+'/dbquery')
var router = express();


//-----------------Route---------------------
router.use(express.json())
router.post('/', (req, res) => {

   var data = req.body;
   
   var usernamequery = `SELECT username from users where username='${data.username}'`
   
   db.query(usernamequery)
   .then(usernamequeryres => {
      if (usernamequeryres.length != 0)
         res.sendStatus(400);

      else
      {
         var sqlquery = `INSERT into users(username,phone,password,pincode,age,covaxin,covishield) VALUES ('${data.username}','${data.phone}','${data.password}',${data.pincode},${data.age},${data.covaxin},${data.covishield})`
         db.query(sqlquery);
         res.sendStatus(200);
      }   
   })
  
})

module.exports = router;
