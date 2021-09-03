const express = require('express')
const router = express();
const db = require(__dirname+'/database')

router.get('/:name/:password', (req, res) => {
        
    const passwordquery = `SELECT password from users WHERE username = '${req.params.name}'`

    db.executeQuery(passwordquery)
    .then(passwordqueryres => {
        if (passwordqueryres.length == 0) {
            res.sendStatus(404);
            throw 'User doesnot exist'
        }

        if (passwordqueryres[0].password != req.params.password) {
            res.sendStatus(401);
            throw 'Incorrect password'
        }

        const sqlquery = `DELETE from users WHERE username = '${req.params.name}'`
        return db.executeQuery(sqlquery)
    })
    .then(queryres => {
        res.sendStatus(200)
    })
    .catch(err => console.log('Error in de-registration: '+err))
    
})

module.exports = router;