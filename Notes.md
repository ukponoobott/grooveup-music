# Video 1 - setting up frontend and backend
For frontend :- 

```bash
npx create-react-app spotify_frontend (sets up frontend folder)

npm install   (installs packages)

npm start (starts react app)

```

For Backend :-
```bash
node init  (sets up backend)
```




# Video 2 - download express packages for backend, run server on a port, create a db on mongodb
```cpp
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
 
```

# Video 3 - create up user model

`Mongoose` is a package that helps us connect mongodb and node.js

```
npm i mongoose  (to install mongoose package into ur backend)
```
```cpp
/* 3 steps to make a model
        1. require moongose
        2. create a moongose schema (structure of a user)
        3. create a model

    there are lots of functions in 'moongose' package
        - moongose.Schema() 
        - moongose
*/

// step1 
const mongoose = require("mongoose");

// step 2 
const User = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false, // my default is false
    },
    email :{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String, // will make it array later - coz lot of songs can be there d
        default: "", // by default value of liked songs will be ""
    },
    likedPlaylist: {
        type: String,
        default: "", 
    },
    subscribedArtists: {
        type: String,
        default: "",
    }

})

//step3
const UserModel = mongoose.model("User", User); // create user from already defined 'userSchema'

module.exports = UserModel; // with this step we can import this file anywhere to access 'UserModel'
```

# Video 4 : song and playlist models
created models for 'song' and 'playlist'

models/Song.js
```js

// creating a model
// step1 : required moongose
// step2 : using moongose create schema
// step3 : create and export model

const mongoose = require("mongoose"); // step1 

const Song = new mongoose.Schema({ // step2 

    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,  // will store a link to image and link is string
        required: true,
    },
    track: {
        type: String, // will try to store a link to image and link is string
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId, // whenever a user is created an id is also associated with that user, so since a artist is also a user who will have a email, name etc, so it will have an id as well so we use that id of user (thats why we give ref:user)
        ref: "user",  
    }, 
}) 

// step3
const SongModel = new mongoose.model("Song", Song); // create a song model named 'Song' with 'Song' schema

module.exports = SongModel;



```
models/Playlist.js
```js
// creating a model
// step1 : required mongoose
// step2 : using mongoose create schema
// step3 : create and export model

const mongoose = require("mongoose"); // step1 

const Playlist = new mongoose.Schema({ // step2 

    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
    },
    songs: [  // note: [] means array of songs, see playlist will have songs, and each song will have all properties of song Model i.e Name,Thumbnail,track,artist
        {
            type: mongoose.Types.ObjectId,  //imp: here again each song will have property of song model, so why to create it again, lets use its id 
            ref: "song", 
        }
    ],
    collaboratrs: [ // array of collaborators i.e users
        {
            type: mongoose.Types.ObjectId,
            ref: "user", 
        }
    ]

    // playlist me songs konge h
    // playlist collaborators
}) 

// step3
const PlaylistModel = new mongoose.model("Playlist", Playlist); // create a Playlist model named 'Playlist' with 'Playlist' schema

module.exports = PlaylistModel;



```