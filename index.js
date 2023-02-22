const express = require('express');
const port = 9000;
const app = express();

























app.listen(port , function(err){
    if(err){
        console.log(`error in strating express server on port: ${port}`);
    }
    console.log(`express server is running on port: ${port}`);
})



