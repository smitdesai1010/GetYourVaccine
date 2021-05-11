const express = require('express')
const router = express();
const db = require(__dirname+'/dbquery')

router.get('/:name/:password', (req, res) => {
        
    var passwordquery = `SELECT password from users WHERE username = '${req.params.name}'`

    db.query(passwordquery)
    .then(passwordqueryres => {
        if (passwordqueryres.length == 0) 
        {
            res.sendStatus(404);
            throw 'User doesnot exist'
        }

        if (passwordqueryres[0].password != req.params.password)
        {
            res.sendStatus(401);
            throw 'Incorrect password'
        }

        var sqlquery = `DELETE from users WHERE username = '${req.params.name}'`
        return db.query(sqlquery)
    })
    .then(queryres => {
        console.log(queryres)
        res.sendStatus(200)
    })
    .catch(err => console.log('Error in deregistration: '+err))
    
})

module.exports = router;