const con = require(__dirname+'/dbconfig')

//const query = async(q) 
 module.exports = {
     query : async (q) => {

        let promise = await new Promise((resolve, reject) => {
            con.query(q, (err, result) => {
                if (err) reject(err);
                resolve(result);
             })
        })
        .catch(err => console.log(err))
        
        return promise
     }
    
 };