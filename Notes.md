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


# Video - 5 : connecting our index.js (backend file) to our database at mongodb

prerequisite : create a db at mongo db (eg. cluster-0), now go to that cluster and fetch the username and pass of user, if u do not remember then create a new user.

we will use `.mongoose.connect('mongo url', {connection type})`

in mongo url we have username and password inside the link, we need to secure the password so that when we save our project on github then no one can see our pass, for that we can save our pass in `.env` file in key value form and when we push our files on github we will not store the .env file there

dotenv reference : [https://www.npmjs.com/package/dotenv?activeTab=readme](https://www.npmjs.com/package/dotenv?activeTab=readme)

```
npm i dotenv     (to install .env into ur backend)
```

now create a '.env' named file just into ur root backend folder, and inside that create a key value pair eg. `MONGO_PASSWORD="Pass134"`, and in ur moongose connection string in place of password, write `process.env.MONGO_PASSWORD`, and it will fetch the pass form that file, (this way we can secure our password from attackers, so before deploying project, delete `.env` file)
```javascript
mongoose.connect(   // connecting our backend to mongo's db
    'mongodb+srv://yashasviyadav:'+ process.env.MONGO_PASSWORD +'@cluster0.c5n5f2b.mongodb.net/?retryWrites=true&w=majority' ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } 
).then((x) => {
    console.log("Mongo Db connected successfully");
}).catch((error) =>{
    console.log("mongo db connection ERROR ");
})
 
```

make sure to add ur current id address before connecting the mongodb to node server
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/286974539-070616a0-a574-43eb-a217-a199c4e79f8e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231130T150818Z&X-Amz-Expires=300&X-Amz-Signature=5b7854edd17f5eae03d17ee4242af6b1409c3a9dc87d3e6afd8f173ac239a180&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)
```javascript
server running at port 2000
Mongo Db connected successfully
```

# video - 6 : Setting up Passport-JWT package for authentication

For authentication we can make logic from scratch but we will have to take care of security on our own, so the better way is to use `passport.js` which is a package that can be used for authorization purpose (signup, login), with all sorts of stuff like `login with google`, `login with twitter`, `email-pass verify` etc. 

So we will use `passport - JWT` 

JWT - JSON web Tocken 

when user (client) tries to log in, he sends a JWT tocken to the server, now server will check if he is a authorized user using that `JWT`.  
every user has unique jwt, with single jwt we can authenticate 1 user

we need to download/install 2 packages `passport` and `passport-jwt`
```
npm i passport passport-jwt    (i means install)
```
note : (we can do this is separate lines as well)
passport-jwt reference : [https://www.passportjs.org/packages/passport-jwt/](https://www.passportjs.org/packages/passport-jwt/)


Inside our prv `index.js` file, require the `passport` and `user` model, and paste the function from the above mentioned website as it is (the 2 commented lines are not mandotary)
```js

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const User = require("./models/User.js"); // fetch User model

// ---> set up passport-jwt for authenticating users

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT_SECRETKEY;  // better to use from env variable (.env)
// opts.issuer = 'accounts.examplesoft.com';   // these 2 are not mandotary lines 
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {  // this will find user or error

        // in login
        // done(error, isUserExists)
        if (err) {   // if error found, then 'jwt tocken not matched', try to login again
            return done(err, false);
        }
        if (user) {  // user found, jwt matched, user logged in 
            return done(null, user);
        } else {
            return done(null, false);  // no error, no user, so create new account
            // or you could create a new account
        }
    });
})); 

```
note: findOne() is a method that works on 'model' we have model 'User' so User.findOne()

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/286992605-73c35007-aabd-4b17-a6a9-96459c70b462.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231130T160723Z&X-Amz-Expires=300&X-Amz-Signature=ee137c37bd1183f7ebcb4b7d54f4ba44e88b9a625c1b45935aff72fca46d93e9&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)


# Video - 7 : Registering New User in Express.js , JWT, MongoDB  

here we will create a signup route, and add authorization functionality in our backend 
for that we can directly add our route inside index.js but we already have a '/' defined there so we do not want to add all routes in that, so letes create a `Routes/auth.js` and here in `auth.js`  we will add all our authorization routes in this file, so lets work on `auth.js`

to start a route we need to :
- require express
- we need router method from the express package so ,now we could import app from express() but it has a lot of functions like app.get(), app.post(), ... and we only need the router() method from the express so lets only import that for efficiency

note :- `Callback function` is any function that is passed as an argument to another function so that it can be executed in that other function is called as a callback function.
eg. `app.post(path, callback [, callback ...])`

node :- `Middleware functions` are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

Few packages installed
```
npm i bcrypt  (for pass->hash converse)
npm i jwt   (for jwt tocken creation )
```

`This is Routes/Auth.js`
```js

const express = require("express");
// now we could import app from express() but it has a lot of functions like app.get(), app.post(), ... and we only need the Router method from the express so lets only import that for efficiency
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res) => { // post req to the route /register
    
    // this func will run when the /register API is called as post request
    //fetch user data from req.body note : while printing we used res.send() because we were giving something, here we want the details from user, whicch we get from 'req.body'
    const {email, password, firstname, lastname, username} = req.body; // note : we did not add password in UserSchema in User.js model because of security reasons

    // s-2 : if user with this emaill exists, throw error (coz this is signup route), for this we use User.findOne() to find a User from Users
    // User. method are used with `await`, and because we used await the callback function is always `async`
    const user = await User.findOne({email: email}); // first email means email of user, second email is the email we defines above

    if(user){ // email match was found, user already exists
        
        return res.status(402).json({error: "a user with this email already exists."}) // we used res.send() to send a string on our server, but if we want to send in key,value pair, then use JSON, also status(200) means something is accepted, but since its an error we use status(402) - convention
    }

    // step3 : user did not exists - create new user in DB
    // step3.1 : never store pass in db in plane text, coz if db hacked all users pass are leaked, so for security reasons, and trust always bcrypt() the data in hash, pass can be converted to hash, hash can never be converted to pass again
    const hashedPassword = bcrypt.hash(password, 10); // install `npm i bycrypt' and require then this 10 will convert pass into hash of length 10

    const newUserData = {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        username
    }; 
    const newUser = await User.create(newUserData)

    
    // step4 : now our user is created, but since our project is using JWT for tockens, we need to create a tocken and send it to db along with the new User Created, so that whenever user logs in again the tocken is matched
    const token = getToken(email, newUser);  // from the getToken() defined in ../utils/helper.js
     
    // step5 : store newUser in JSON and its token together and then send it, make sure to delete its hashed password, coz its tocken is generated (for security reasons)
    const userToReturn = {...newUser.toJSON(), token};   //... is spread operator means copy all valued of newUser.toJSON() into the 'userToReturn' 
    delete userToReturn.password; 
    return res.status(200).json(userToReturn); // 200 means work is done  (by deafault status:200)

});

```


`'utils/helpers.js'`
```js
//This is 'utils/helpers.js'

// this file will have all the methods that we will use again and again, so we are defining all of them here for anywhere use

const jwt = require("jwt");  // install `npm i jwt`
exports = {};

exports.getToken = async (email, user) => {
    const token = jwt.sign({identifier: user._id});
    return token;
};

modules.exports = exports;
```
