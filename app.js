//-----------------config credentials stored in env file--------------------------------
require('dotenv').config();

const express = require('express');
const register = require('./routes/register')
const deregister = require('./routes/deregister')
const checkforVaccine = require('./routes/checkforVaccine')


//------------------checks vaccine availability every 12 hours--------
checkforVaccine();


//----------------express server-------------------
const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.static('public'));
app.use('/register',register);
app.use('/deregister',deregister);
app.all('*', (req, res) => { res.send('Invalid path') })

app.listen(PORT, () => console.log(`Process running at localhost:${PORT}`) )