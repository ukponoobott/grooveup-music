/* to get started with the backend
    - npm init  (get started with the backend)
    - npm install express or npm i express (install express node modules)
    - import express package into ur index.js
    - lets create an app of this express package

    - using this app variable we can make 2 types of API's .get() and .post() 
    - lets create a get() api using app, .get() has 2 arguments , note : app.get(route on which server will run, respond
    - on / route lets display text "This is Yashasvi's server" using res.send()
    - to set the localhost:PORT u need to use app.listen(Port no, what to perform)


*/

const express = require("express");
const app = express();

const PORT = 200;

app.get("/", (req, res) => {  // if we use /home then server will run there
    
    res.send("This is Yashasvi's server");
})

app.listen(PORT, () =>{
    console.log("server running successfully at port number " + PORT);
}) 
 