const express = require('express');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//place the logger at the top
app.use(logger);

app.use(express.json());

app.use(cookieParser());

//dirname is a global variable that nodejs understand:
// it says look inside the folder that we are in; eg. '/public' to look for static file like css or other
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

app.all('*', (req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({message: "404 Not found"})
    }else{
        res.type('txt').send('404 not found')
    }
})

//place errorhandler at the end just before when we call our listner
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${ PORT}`));