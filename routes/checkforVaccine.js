const db = require(__dirname + '/dbquery')
const fetch = require('node-fetch')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const checkAvailability = async() => {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const CHECKINGTIME = 0.5 * HOUR;
    
    //first fetch all unique districts
    //check availability in those districts
    //then match age
    //then vaccine type
    //if match then notify the user

    setInterval(async () => {

        const uniquePincodes = await db.query("select distinct pincode from users")

        let dateObj = new Date();
        let date = dateObj.getUTCDate()+'-'+(dateObj.getUTCMonth() + 1)+'-'+dateObj.getUTCFullYear();

        if (!uniquePincodes || uniquePincodes.length == 0)
            return;

        uniquePincodes.forEach(ele => {
            let pincode = ele.pincode;
            
            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`,{
                method: 'GET',
                headers : {    
                    "Accept"       : "application/json",
                    "Content-Type" : "application/json",
                    "user-agent"   : "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                 } 
            })
            .then(res => {

                if (res.status == 403)  //sent too many requests, blocked temporarily
                    CHECKINGTIME = 26 * HOUR;  //cooldown period

                if (res.status != 200)
                    throw 'Error code: '+res.status;
    
                return res.json();
            })
            .then(json => matchCenter(json.centers))
            .catch(err => console.log('Error in getting fetching cowin api: '+err))    

        });  
    },CHECKINGTIME);
}

function matchCenter(centers){

    if (!centers || centers.length == 0)
        return;

    let query = `SELECT username,phone,age,covaxin,covishield from users WHERE pincode = ${centers[0].pincode}`;

    db.query(query)
    .then(data => {        
        data.forEach(user => {
            let msg = '';    

            centers.forEach(center => {
                if (!center.sessions || center.sessions.length == 0)
                    return;

                //one per center
                let tempmsg = '';

                center.sessions.forEach(session => {
                    if (session.available_capacity <= 0 )
                        return;

                    if (user.age < session.min_age_limit)
                        return;
                    
                    //replace == with substr as multiple vaccines maybe available    
                    if (session.vaccine.toUpperCase() == 'COVAXIN' && !user.covaxin)    
                        return;

                    if (session.vaccine.toUpperCase() == 'COVISHIELD' && !user.covishield)    
                        return;                    

                    tempmsg += `Date: ${session.date}\n`+
                               `Current capacity: ${session.available_capacity}, Minimum age: ${session.min_age_limit}\n`+
                               `Slots: ${session.slots.toString()}\n`;
                    
                })

                //no valid sessions found
                if (tempmsg == '') 
                    return;

                tempmsg = `\n${center.sessions[0].vaccine} vaccine is available at ${center.name}`+
                          `\nAddress: ${center.address},${center.block_name},${center.pincode}\n\n`+ 
                          tempmsg+'\n\n';

                msg += tempmsg;

            })

            //empty msg means no valid center & session found according to users need
            if (msg == '')
            return;
            
            msg = `Hello ${user.username}\n` + msg;

            //twilio has set a max limit of 1600 characters
            let trimmedmsg = msg.length > 1400 ? msg.substring(0,1400) : msg;

            trimmedmsg += `Note: You still need to register via the Cowin portal or Arogyasetu app\n`+ 
                          `To stop receiving this sms, kindly deregister yourself from our website`;   
        
            sendSMS(trimmedmsg,user.phone);
        })
    })

}

function sendSMS(message,phoneNumber){

    client.messages
      .create({
               body: message, 
               from: '+14804852440', 
               to: `+91${phoneNumber}`
            })
      .then(res => console.log(res))
      .catch(err => console.log(err));
}

module.exports = checkAvailability;