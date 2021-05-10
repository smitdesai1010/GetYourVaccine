const express = require('express')
const router = express();
const db = require(__dirname+'/dbquery')

router.get('/:name', (req, res) => {
    var sqlquery = `DELETE from users WHERE name = '${req.params.name}'`
    
    db.query(sqlquery)
    .then(res => console.log(res))
})

module.exports = router;