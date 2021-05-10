const express = require('express')
const db = require(__dirname+'/dbquery')
var router = express();


//-----------------Route---------------------
router.use(express.json())
router.post('/', (req, res) => {

   var data = req.body;
   var sqlquery = `INSERT into users(name,phone,pincode,age,covaxin,covishield) VALUES ('${data.name}','${data.phone}',${data.pincode},${data.age},${data.covaxin},${data.covishield})`

   db.query(sqlquery)
   res.send('Inserted')
})

module.exports = router;
