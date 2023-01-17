const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//dirname is a global variable that nodejs understand:
// it says look inside the folder that we are in; eg. '/public' to look for static file like css or other
app.use('/', express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => console.log(`server running on port ${ PORT}`));