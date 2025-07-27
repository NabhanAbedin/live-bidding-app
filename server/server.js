const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()



app.listen(5001, () => {
    console.log('server started');
})