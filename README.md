
# GetYourVaccine

A web-application which notifies users via a SMS as a vaccine is available in 
their borough matching their demographic profile (age and vaccine preferences).

It was primarily build as India faced a vaccine shortage during it's intial vaccination drive
and the vaccine registration portal lacked a notifying feature. As a result of which, people had to
poll for vaccine every few hours. 

Note: Only works for Indian vaccination program. 
## Run Locally

Note: The CoWin API will only accept requests originating from India.

Install node, npm and MySQL
```
https://nodejs.org/en/download/
https://www.mysql.com/downloads/
```

Clone the project

```bash
git clone https://github.com/smitdesai1010/GetYourVaccine.git
```

Go to the project directory

```bash
cd GetYourVaccine
npm install     
npm run start   
```

  
## Environment Variables

To run this project, you will need to add the following 
environment variables to your .env file present in root directory

<pre>
    <span>MYSQL_USERNAME</span>
    <span>MYSQL_PASSWORD</span>
    <span>MYSQL_HOST</span>
    <span>MYSQL_DATABASE</span>
    <a href="https://www.twilio.com/docs/iam/access-tokens ">
    <span>TWILIO_ACCOUNT_SID</span>
    <span>TWILIO_AUTH_TOKEN</span>
    </a>
</pre>



  
## Acknowledgements

 - [CoWin Public API](https://apisetu.gov.in/public/marketplace/api/cowin)
 - [Twilio SMS API](https://www.twilio.com/sms)

  
## Feedback

If you have any feedback, please reach out to me at smitdesai1010@gmail.com
  