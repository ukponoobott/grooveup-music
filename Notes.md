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



`.utils/helpers.js`
```js
//   utils/helpers.js

const jwt = require("jsonwebtoken");  // install `npm i jsonwebtoken`
exports = {};
require('dotenv').config(); // include .env into project TO access environment variable


exports.getToken = async (email, user) => {
    const token = jwt.sign({identifier: user._id}, process.env.PASSPORT_JWT_SECRETKEY );
    return token;
};

module.exports = exports;


```

# video- 8 : Fixing Register User Bugs and Testing New User Creation using `Postman` 

now we know that the entry point of each node backend project is the file `index.js`, so we need that to make our `Routes/auth.js` with `/register` functionality work we need to import it in the `index.js` so what we will do is using `app.use()` we will add a `/auth` route and whever user goes to this route the `auth.js` will be invoked and whver the user enters `website.com/auth/register` the register route function inside the auth.js will run

before that i updated a few lines of the `index.js` like imported `./Routes/auth.js` in this file and also using `express` package i added express.json to the top of index.js so that whever i recieve anything from user like email and password, it automatically gets converted to `.JSON` format

```bash
$ npm i jsonwebtoken
```

`utils/helpers.js`
```js

// this file will have all the methods that we will use again and again, so we are defining all of them here for anywhere use

const jwt = require("jsonwebtoken");  // install `npm i jsonwebtoken`
exports = {};
require('dotenv').config(); // include .env into project TO access environment variable


exports.getToken = async (email, user) => {
    const token = jwt.sign({identifier: user._id}, process.env.PASSPORT_JWT_SECRETKEY );
    return token;
};

module.exports = exports;
```

make sure to export the auth.js module at the end of 'Routes/auth.js'
and import auth.js routes at the top of index.js 


Go to [postman.com](https://www.postman.com/) and download and install the app for into ur system

Postman is an application used for API testing purpose, to test ur different types of api's like get, post, etc with diffrent types of data and check what is the output

create a blank collection, name it, then click on `+` icon and create new request inside this collection, and select `http` then to test a api that doesnt take any input select `none ` in the params and for apis that need input, go to the `body` then select `JSON` instead of text and give the data in JSON format eg `{ "email":"yashasvi@gmail.com"}` then click on `send` and wait for output at the bottom.

lets test our /test route API first 
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287436647-70543982-3b77-4a21-a64e-5c463eddca81.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231202T101043Z&X-Amz-Expires=300&X-Amz-Signature=5b768e6c828e4577d524cd42ef9d305f22155d491f577248560f205675a69bdf&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)

lets now test our `/register/auth` route API now which is Signup API or register API:- 

User created :-
![Postman testing](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287435197-3f578bd9-1ec4-4baf-8b13-4bef42029604.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231202T093909Z&X-Amz-Expires=300&X-Amz-Signature=fed519ff54be7a348f3c212e8797ed56191687e9914f2560e70ac5b5f527eddf&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)

User already exists :-
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287435287-4324548b-3965-4424-a551-0006ece3cf4f.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231202T094044Z&X-Amz-Expires=300&X-Amz-Signature=de16f514054a297be5ec30266097e0a621653185bf2f5d692fdf762f379f519f&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)


new User `yashasvi` created on our Mongo DB :- 
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287435623-8b4feaf7-edda-4e07-ab41-616e4262d26c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231202T094820Z&X-Amz-Expires=300&X-Amz-Signature=25763e4d8a8987aabf3a541dcaea8c44612709cfda954f71cb9ec5837b50ef4c&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)


`utils/helpers.js`
```js

// this file will have all the methods that we will use again and again, so we are defining all of them here for anywhere use

const jwt = require("jsonwebtoken");  // install `npm i jsonwebtoken`
exports = {};
require('dotenv').config(); // include .env into project TO access environment variable

exports.getToken = async (email, user) => {
    const token = jwt.sign({identifier: user._id}, process.env.PASSPORT_JWT_SECRETKEY );
    return token;
};

module.exports = exports;
```

`Routes/auth.js`
```js
const express = require("express");
// now we could import app from express() but it has a lot of functions like app.get(), app.post(), ... and we only need the Router method from the express so lets only import that for efficiency
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res) => { // post req to the route /register

    console.log("reached /register/auth.js");
    res.send('This is /auth/register route');
    
    // this func will run when the /register API is called as post request
    //fetch user data from req.body note : while printing we used res.send() because we were giving something, here we want the details from user, whicch we get from 'req.body'
    const {email, password, firstName, lastName, username} = req.body; // note : we did not add password in UserSchema in User.js model because of security reasons

    // s-2 : if user with this emaill exists, throw error (coz this is signup route), for this we use User.findOne() to find a User from Users
    // User. method are used with `await`, and because we used await the callback function is always `async`
    const user = await User.findOne({email: email}); // first email means email of user, second email is the email we defines above

    if(user){ // email match was found, user already exists
        
        return res.status(403).json({error: "a user with this email already exists."}) // we used res.send() to send a string on our server, but if we want to send in key,value pair, then use JSON, also status(200) means something is accepted, but since its an error we use status(402) - convention
    }

    // step3 : user did not exists - create new user in DB
    // step3.1 : never store pass in db in plane text, coz if db hacked all users pass are leaked, so for security reasons, and trust always bcrypt() the data in hash, pass can be converted to hash, hash can never be converted to pass again
    const hashedPassword = bcrypt.hash(password, 10); // install `npm i bycrypt' and require then this 10 will convert pass into hash of length 10

    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username
    }; 
    const newUser = await User.create(newUserData)

    
    // step4 : now our user is created, but since our project is using JWT for tockens, we need to create a tocken and send it to db along with the new User Created, so that whenever user logs in again the tocken is matched
    const token = getToken(email, newUser);  // from the getToken() defined in ../utils/helper.js
     
    // console.log(token);

    // step5 : store newUser in JSON and its token together and then send it, make sure to delete its hashed password, coz its tocken is generated (for security reasons)
    const userToReturn = {...newUser.toJSON(), token};   //... is spread operator means copy all valued of newUser.toJSON() into the 'userToReturn' 
    delete userToReturn.password; 
    return res.status(200).json(userToReturn); // 200 means work is done  (by deafault status:200)

});


module.exports = router;
```

`./index.js`
```js
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

const express = require("express");  // import express package
const app = express();   // create app from express
const mongoose = require("mongoose"); // require mongoose into project
require('dotenv').config() // include .env into project TO access password

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require("passport");
const User = require("./models/User.js"); // fetch User model

const authRoutes = require("./Routes/auth.js");
app.use(express.json());   // so that every data that express package gets (like email, pass, ..) will be converted to JSON  

const PORT = 8080;

// --> setting up mongo data base 

mongoose.connect(   // connecting our backend to mongo's db
// note: make .env file and write make a 'MONGO_PASSWORD' as key and ur password as 'value' MONGO_PASSWORD="qri123" 
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


// defining a route 
app.get("/", (req, res) => {  // if we use '/home' then server will run there
    res.send("Hello World");
})

app.use('/auth', authRoutes);

app.get('/test', (req, res) => {// for postman testing purpose
    res.send('Hello, this is get ./test endpoint!');
});

// app.post('/testing', (req, res) => {    // for postman testing purpose
//     res.send("/testing endpoint is working fine");
//     console.log("/testing endpoint is working fine -- console");
// })

// starting server at desired port
app.listen(PORT, () => { 
    console.log("server running at port " + PORT);
})
```

# video - 9 : creating /Login route inside './auth.js' 

first thing first we need to update our models/User.js i.e `User model` and add the `password` field inside that so that we can store the hashed password (from `auth/register` function), which is a bug from video 8

updated `User.js`
```js

/* 3 steps to make a model
        1. require moongose
        2. create a moongose schema (structure of a user)
        3. create a model

    there are lots of  functions in 'moongose' package
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
    },
    password: {  // just added
        type: String,
        required: true,
    },
})

//step3
const UserModel = mongoose.model("User", User); // create user from already defined 'userSchema'

module.exports = UserModel; // with this step we can import this file anywhere to access 'UserModel'
```

after adding the `/register` functionality :- 

`Routes/auth.js` 
```js

const express = require("express");
// now we could import app from express() but it has a lot of functions like app.get(), app.post(), ... and we only need the Router method from the express so lets only import that for efficiency
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

// /auth/register route 
router.post("/register", async (req, res) => {  // working fine ✔️

    // this func will run when the /register API is called as post request
    //step 1 : fetch user data from req.body note : while printing we used res.send() because we were giving something, here we want the details from user, whicch we get from 'req.body'
    const {email, password, firstName, lastName, username} = req.body; // note : we did not add password in UserSchema in User.js model because of security reasons

    // console.log("reached /register/auth.js line 20"); // TESTING PURPOSE

    // s-2 : if user with this emaill exists, throw error (coz this is signup route), for this we use User.findOne() to find a User from Users
    // User. method are used with `await`, and because we used await the callback function is always `async`
    const user = await User.findOne({email: email}); // first email means email of user, second email is the email we defines above

    if(user){ // email match was found, user already exists
        
        return res.status(403).json({error: "a user with this email already exists."}) // we used res.send() to send a string on our server, but if we want to send in key,value pair, then use JSON, also status(200) means something is accepted, but since its an error we use status(402) - convention
    }

    // step3 : user did not exists - create new user in DB
    // step3.1 : never store pass in db in plane text, coz if db hacked all users pass are leaked, so for security reasons, and trust always bcrypt() the data in hash, pass can be converted to hash, hash can never be converted to pass again
    const hashedPassword = await bcrypt.hash(password, 10); // install `npm i bycrypt' and require then this 10 will convert pass into hash of length 10

    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username
    }; 

    const newUser = await User.create(newUserData)

    // step4 : now our user is created, but since our project is using JWT for tockens, we need to create a tocken and send it to db along with the new User Created, so that whenever user logs in again the tocken is matched
    const token = await getToken(email, newUser);  // from the getToken() defined in ../utils/helper.js
     
    // step5 : store newUser in JSON and its token together and then send it, make sure to delete its hashed password, coz its tocken is generated (for security reasons)
    const userToReturn = {...newUser.toJSON(), token};   //... is spread operator means copy all valued of newUser.toJSON() into the 'userToReturn' 
    
    // delete userToReturn.password; 
    // console.log(userToReturn);   // this line is removable, its just for error Testing purpose 

    return res.status(200).json(userToReturn); // 200 means work is done  (by deafault status:200)

});


//    /auth/login route
router.post("/login", async (req, res) => {

    // step1 : get email, password from user
    const {email, password} = req.body;

    // step2 : check if a user with this email already exists
    const user = await User.findOne({email: email});   

    // step3 : if user does not exists, then return "Invalid credentials" and status 403
    if(!user){
        return res.status(403).json({error: "Invalid Credentials"});
    }

    // step4 : reached here means user exists, but password has not been checked yet, but if you remember inside the /register route we have stored the user with 'hashedPassword' inside the data base, but just now inside req.body we got the password in plain text, so how can we compare this?
    // we can not convert hashed pass to original password, but we can convert the org pass to hashed pass again, but to make sure that if plain text password is same then 'hashedPass' should also be same i.e for a password 'hiiampass' hashed code should always be '13#58392skadj' , we can achieve this if we set the 2 parameters of 'hashing' as fix, and which is automatically done by 'bcrypt' , all we have to do is compare
    
    // console.log(user);  // For Error testing purpose 
    // console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);  // if u have error in this line means we are not able to fetch the password of user
         
    // step5 : pass is not mathed, then return 403 status
    if(!isPasswordValid){
        return res.status(403).json({error: "Invalid Credentials"});
    }

    // step6 : pass is matched, so create a tocken for user and send it with the user
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    // delete userToReturn.password; // security purposes 
    
    return res.status(202).json(userToReturn);
});

module.exports = router;


```

lets create a new user and verify it to test the `auth/register` API :- 
![img](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287513524-45f84f5c-765f-4946-9028-1e60a9e8ff39.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231203T111452Z&X-Amz-Expires=300&X-Amz-Signature=2840c2a6c39902f323dd90a90cc1b28d00eaaad18519970fe0b913586db92952&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)


lets now veryfy the same user using `auth/login` API with the same ` email and password ` with which we created an account above :-

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287513601-290b11d0-80a0-44ad-b39f-2de697f264a2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231203%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231203T111659Z&X-Amz-Expires=300&X-Amz-Signature=bf7c07e7799ccd5e7a6c8bc8bc1c688efa12368e8aec4de1fe15783e29b2d001&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725198788)
'user exists 👆'


# video 10 - lets create a song/create route to create a new song 

including `Routes/song` in the index.js
```js
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

const express = require("express");  // import express package
const app = express();   // create app from express
const mongoose = require("mongoose"); // require mongoose into project
require('dotenv').config() // include .env into project TO access password

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require("passport");
const User = require("./models/User.js"); // fetch User model

const authRoutes = require("./Routes/auth.js");
const songRoutes = require("./Routes/song.js");

app.use(express.json());   // so that every data that express package gets (like email, pass, ..) will be converted to JSON  

const PORT = 8080;

// --> setting up mongo data base 

mongoose.connect(   // connecting our backend to mongo's db
// note: make .env file and write make a 'MONGO_PASSWORD' as key and ur password as 'value' MONGO_PASSWORD="qri123" 
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


// defining a route 
app.get("/", (req, res) => {  // if we use '/home' then server will run there
    res.send("Hello World");
})

app.use('/auth', authRoutes);
app.use('/song', songRoutes); // means whenever use hits '/song' route then call the songRoute.js


app.get('/test', (req, res) => {// for postman testing purpose
    console.log("Hello ur ./test route is working fine");
    res.send('Hello, this is get ./test endpoint!');
});

app.post('/testing', (req, res) => {    // for postman testing purpose
    res.send("/testing endpoint is working fine");
    console.log("/testing endpoint is working fine -- console");
})

// starting server at desired port
app.listen(PORT, () => { 
    console.log("server running at port " + PORT);
})

```

creating a `song/create` route API :-

note : we will use a `router.post("/create", passport.authenticate("user") , async (req,res) => ` here passport.authenticate("jwt")  is a middleware function which works before the callback (req,res) and what it does is it will authenticate the user first then it will create a song with artist=the authorized guy, and note that this `passport.authenticate("jwt")` authenticates a user based on its `TOKEN` that was generated why user logged in or registerd using `/auth/login` apis.

this passport.authenticate("jwt") is in `index.js` we added in before videos.

`Routes/song.js`
```js
// here all the song related routes API will be stored 

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");


// /song/create
router.post("/create", passport.authenticate("jwt") , async (req,res) => {   // post(route, middleware fun, callback func)

    // step1 : to create a song we need the name(title), thumbnail, track, artist 
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){ // if any field is not complete do not create song
        return res.status(301).json({err: "Insufficient song data"});
    }

    const artist = req.user._id;  // this way the id generated while creating the user will fetch the artist
    const songDetails = {name, thumbnail, track, artist};

    // reached here means everything is fine, so create a song based on 'Song' schema model
    const createdSong = await Song.create({songDetails});
    return res.status(200).json(createdSong);

});

module.exports = router;
```

# video 11 : creating a `/Routes/song/get/mysong` API to get songs whose artist and testing `song/create` API

lets test our `song/create` API by creating a song for a user usign its token:-

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287640942-c041bee1-bb7c-494c-9ec1-4b30cc978821.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231204%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231204T085127Z&X-Amz-Expires=300&X-Amz-Signature=9b40829b3360d6dcde278a14d1d8a31b8bf764b9cd81536a0127ad00de90da6a&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725081418)
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/287640076-9918c87c-9dcf-405b-a869-881710efabe6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231204%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231204T084833Z&X-Amz-Expires=300&X-Amz-Signature=3966f98b5b1da01fa576741a4e2ed7110c263b5592da3a877abb218a5d03c0e3&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=725081418)

note : that for since i used a passport.authorization("jwt") middle ware function, so while testing the API i need to authorize the user, so for that write an API route in postman, and then go to the 'authorization' tab and select 'bearer token' then in the empty field paste the user's token that u created earlier while creating the user, and then in body and JSON type the songs 'title, track, thumbnail'

-----

note : we do not need to give body parameters to the `GET` API coz most platforms do not support it, so in case we want to give arguments always use `POST` :- 

Lets now test the `/song/get/mysongs` API :- 

![](https://github.com/yashasviyadav1/recipe-webapp/assets/124666305/fb492d1a-798b-4236-9e87-34993de7f59a)

-------------
imp note : if someone is getting this error :
 MongooseError: Model.findOne() no longer accepts a callback

Then go to your package.json file, and in there chenge it to 
"dependencies": {
  "mongoose": "^5.13.20",
  // other dependencies...
}

After that run : npm install  
in your terminal, after running it check the downgraded mongoose version by: npm list mongoose 
see if has downgraded to 5.X.X from your previous version
This will solve the problem...


creating 

`Route/Song` 

```js
// here all the song related routes API will be stored 

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");

// /song/create
router.post("/create", passport.authenticate("jwt", {session: false}) , async (req,res) => {   // post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time

    // console.log("= = = = = = = = = = reached /song/create function = = = = = = = = = ")

    // step1 : to create a song we need the name(title), thumbnail, track, artist 
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){ // if any field is not complete do not create song
        return res.status(301).json({err: "Insufficient song data"});
    }

    const artist = req.user._id;  // this way the id generated while creating the user will fetch the artist
    const songDetails = {name, thumbnail, track, artist};

    // console.log("reached line 22");
    
    // reached here means everything is fine, so create a song based on 'Song' schema model
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);

});


//    /song/get/mysongs
router.get("/get/mysongs", passport.authenticate("jwt" ,{session: false}), async (req,res) => {// post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time
  

    // step1 : reached here means user is authenticated, so we need to now get all the songs whos artist=user._id
    const songs = await Song.find({artist: req.user._id});  // .findOne() only finds single thing,   .find() will help find all the songs that matched the condition of {artist: req.user._id}
    return res.status(200).json({data: songs});

})

module.exports = router;
```

# video - 12  : creating get songs by artist and song name API `song/get/artist`   and `song/get/songName`

`Routes/song.js`
```js
// here all the song related routes API will be stored 

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// /song/create
router.post("/create", passport.authenticate("jwt", {session: false}) , async (req,res) => {   // post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time

    console.log("= = = = = = = = = = reached /song/create function = = = = = = = = = ")

    // step1 : to create a song we need the name(title), thumbnail, track, artist 
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){ // if any field is not complete do not create song
        return res.status(301).json({err: "Insufficient song data"});
    }

    const artist = req.user._id;  // this way the id generated while creating the user will fetch the artist
    const songDetails = {name, thumbnail, track, artist};

    console.log("reached line 22");
    
    // reached here means everything is fine, so create a song based on 'Song' schema model
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);

});


//    /song/get/mysongs
router.get("/get/mysongs", passport.authenticate("jwt" ,{session: false}), async (req,res) => {// post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time
  

    // step1 : reached here means user is authenticated, so we need to now get all the songs whos artist=user._id
    const songs = await Song.find({artist: req.user._id});  // .findOne() only finds single thing,   .find() will help find all the songs that matched the condition of {artist: req.user._id}
    return res.status(200).json({data: songs});

})


//    /song/get/artist    - get route to get all the songs published by a certian artist 
router.get("/get/artist", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1: get the artist's id from req.body  
    const {artistId} = req.body;  // note that we should not take input from req.body in .get() method, so we will change it soon
    
    // fetch the artist(user) whose id is artist id
    const artist = await User.findOne({_id: artistId}); 
    if(artist){ // if such artist doesn't exists 
        return res.status(301).json({err: "Artist doesn't exists"});
    }

    // step2 : fetch all the songs whole artist: artistId
    const songs = await Song.find({artist: artistId});    // .find() is used to get all the values   .findOne() is used to get only a single value
    return res.status(200).json({data: songs});     

})

//     /song/get/songname      - get route to get all the songs with exact title - eg. 'baarish'
router.get("/get/songname", passport.authenticate("jwt", {session: false}), async (req, res) => {
    
    // step1 : get the song name from user 
    const {songName} = req.body;

    // step2 : fetch all the songs with name: songName and return them
    // here we can add the 'pattern matching' functionality later maybe using regx, such that when a user searched 'baar' the 'baarish' song appears 
    const songs = await Song.find({name: songName});
    return res.status(200).json({data: songs});
})


module.exports = router;
``` 

`index.js`
```js

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

const express = require("express");  // import express package
const app = express();   // create app from express
const mongoose = require("mongoose"); // require mongoose into project
require('dotenv').config() // include .env into project TO access password

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require("passport");
const User = require("./models/User.js"); // fetch User model

const authRoutes = require("./Routes/auth.js");
const songRoutes = require("./Routes/song.js");
const playlistRoutes = require("./Routes/playlist.js");

app.use(express.json());   // so that every data that express package gets (like email, pass, ..) will be converted to JSON  

const PORT = 8080;

// --> setting up mongo data base 

mongoose.connect(   // connecting our backend to mongo's db
// note: make .env file and write make a 'MONGO_PASSWORD' as key and ur password as 'value' MONGO_PASSWORD="qri123" 
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

// defining a route 
app.get("/", (req, res) => {  // if we use '/home' then server will run there
    res.send("Hello World");
})

app.use('/auth', authRoutes);
app.use('/song', songRoutes); // means whenever use hits '/song' route then call the songRoute.js
app.use('./playlist', playlistRoutes); 

app.get('/test', (req, res) => {// for postman testing purpose
    console.log("Hello ur ./test route is working fine");
    res.send('Hello, this is get ./test endpoint!');
});

app.post('/testing', (req, res) => {    // for postman testing purpose
    res.send("/testing endpoint is working fine");
    console.log("/testing endpoint is working fine -- console");
})

// starting server at desired port
app.listen(PORT, () => { 
    console.log("server running at port " + PORT);
})


// "mongoose": "^8.0.2",  // original mongoose version that i removed


```


# video - 13 : creating `playlist/create`   and `playlist/get/:playlistId` 

`Routes/playlist.js`
```js

const express = require("express");
const router = express.Router();
const passport = require("passport");

const Playlist = require("../models/Playlist");

// .post route to create playlist,     /playlist/create    
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {

    // step1 : to create a new playlist we need 'playlistName' 'thumbnail' 'songs' and 'owner' 'collaboratrs'
    // the owner is the one creating the playlist so we do not need to get that from req.body, we can fetch it by ourselves
    const {name, thumbnail, songs} = req.body;
    const currUser = req.user; // we got this from req because in middleware fun we authenticated the user

    if(!name || !thumbnail || !songs ){
        return res.status(301).json({err: "insufficient data to create a playlist"});
    }

    // step2 : combine all the playlist data and create a playlist with all that
    const playlistData = {name, thumbnail, songs, owner:currUser._id, collaborators:[]}; // IMP note: in the 'Playlist' model we have created the owner type as  type: mongoose.Types.ObjectId, thats why here we set {owner: currUser._id} initially there are no collaborators
    
    const playlist = await Playlist.create(playlistData); 
    return res.status(200).json(playlist);
     
})  



/*     /playlist/:playlistId   

            note that we used `:` column before playlist id because if we call a route `www.abc.com/login` then it will 
                    only trigger when we give proper `www.abc.com/login` route, but when we use /playlist/:playlistId   in a API function 
                    then this means that 'playlistId' is a variable value i.e it can have any type of value in place of 'playlistId' and this API will be called
                    for eg. if i type   '/playlist/12dsf' '/playlist/abcs2'  '/playlist/okns' then also this API function will call. coz `:` opearator makes a value as variable
*/

// get route API - to get a playlist with a certain playlistid match
router.get("/get/:playlistId", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1 : we discussed earlier then we should not take any thing from req.body in a .get() API coz it is not a good practice, thats why we used the `:` symbol using which we can fetch the playlist id from the route itself (given by user)
    const playlistId = req.params.playlistId; // fetched data from the route (without using req.body)

    // step2 : search for this playlist with given playlist id
    const playlist = await Playlist.findOne({_id: playlistId});

    if(!playlist){ // no such playlist exists 
        return res.status(301).json({err: "invalid playlist id"})
    }

    return res.status(200).json(playlist);
      
}) 

module.exports = router;
```

`index.js`
```js

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

const express = require("express");  // import express package
const app = express();   // create app from express
const mongoose = require("mongoose"); // require mongoose into project
require('dotenv').config() // include .env into project TO access password

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require("passport");
const User = require("./models/User.js"); // fetch User model

const authRoutes = require("./Routes/auth.js");
const songRoutes = require("./Routes/song.js");
const playlistRoutes = require("./Routes/playlist.js");

app.use(express.json());   // so that every data that express package gets (like email, pass, ..) will be converted to JSON  

const PORT = 8080;

// --> setting up mongo data base 

mongoose.connect(   // connecting our backend to mongo's db
// note: make .env file and write make a 'MONGO_PASSWORD' as key and ur password as 'value' MONGO_PASSWORD="qri123" 
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

// defining a route 
app.get("/", (req, res) => {  // if we use '/home' then server will run there
    res.send("Hello World");
})

app.use('/auth', authRoutes);
app.use('/song', songRoutes); // means whenever use hits '/song' route then call the songRoute.js
app.use('./playlist', playlistRoutes); 

app.get('/test', (req, res) => {// for postman testing purpose
    console.log("Hello ur ./test route is working fine");
    res.send('Hello, this is get ./test endpoint!');
});

app.post('/testing', (req, res) => {    // for postman testing purpose
    res.send("/testing endpoint is working fine");
    console.log("/testing endpoint is working fine -- console");
})

// starting server at desired port
app.listen(PORT, () => { 
    console.log("server running at port " + PORT);
})


// "mongoose": "^8.0.2",  // original mongoose version that i removed


```




# video - 14 : creating an API to get all playlists made by an artist `playlist/get/artist/:artistId` and an API to add a song to the Playlist. `playlist/add/song` 

IMP : in the prv video we created a `playlist/get/:playlistId`  API and today we will create a `playlist/get/:artistId` API but we need to fix the Routes of these 2 APIs because lets say user sends a req for `playlist/get/23hcsf` now this '23hcsf' is id we know but our backend will get confused that whether its a playlistId or a artistId and it will get confused in sending the API req so to fix these we can fix the routes of both the APIs and the new Routes will be  `playlist/get/artist/:artistId` to fetch playlist created by an artist  and `playlist/get/:playlistId`  API to fetch the desired Playlist with a playlist id


IMP Note : if a user wants to add a song to a playlist, he must have access to a playlist i.e either he has to be a collaborator or he has to be the owner of that playlist, then only he can add songs to that playlist.

`Routes/playlist.js` 
```js
const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const Playlist = require("../models/Playlist");

// .post route to create playlist,     /playlist/create    
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {

    // step1 : to create a new playlist we need 'playlistName' 'thumbnail' 'songs' and 'owner' 'collaboratrs'
    // the owner is the one creating the playlist so we do not need to get that from req.body, we can fetch it by ourselves
    const {name, thumbnail, songs} = req.body;
    const currUser = req.user; // we got this from req because in middleware fun we authenticated the user

    if(!name || !thumbnail || !songs ){
        return res.status(301).json({err: "insufficient data to create a playlist"});
    }

    // step2 : combine all the playlist data and create a playlist with all that
    const playlistData = {name, thumbnail, songs, owner:currUser._id, collaborators:[]}; // IMP note: in the 'Playlist' model we have created the owner type as  type: mongoose.Types.ObjectId, thats why here we set {owner: currUser._id} initially there are no collaborators
    
    const playlist = await Playlist.create(playlistData); 
    return res.status(200).json(playlist);
     
})  



/*     /playlist/:playlistId   

            note that we used `:` column before playlist id because if we call a route `www.abc.com/login` then it will 
                    only trigger when we give proper `www.abc.com/login` route, but when we use /playlist/:playlistId   in a API function 
                    then this means that 'playlistId' is a variable value i.e it can have any type of value in place of 'playlistId' and this API will be called
                    for eg. if i type   '/playlist/12dsf' '/playlist/abcs2'  '/playlist/okns' then also this API function will call. coz `:` opearator makes a value as variable
*/

// get route API - to get a playlist with a certain playlistid match
router.get("/get/playlist/:playlistId", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1 : we discussed earlier then we should not take any thing from req.body in a .get() API coz it is not a good practice, thats why we used the `:` symbol using which we can fetch the playlist id from the route itself (given by user)
    const playlistId = req.params.playlistId; // fetched data from the route (without using req.body)

    // step2 : search for this playlist with given playlist id
    const playlist = await Playlist.findOne({_id: playlistId});

    if(!playlist){ // no such playlist exists 
        return res.status(301).json({err: "invalid playlist id"})
    }

    return res.status(200).json(playlist);
      
}) 


//  /playlist/get/artist/:artistId   get route to get all the playlist created by an artist (artist id)
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}), async (req,res) =>{

    // step 1 : get the artist id (not from req.body) but  from route parameters
    const artistId = req.params.artistId;
    
    // step2 : check if such artist exists or not
    const artist = await User.findOne({_id: artistId});  // note : _id is a unique id assigned by mongoDb to any schema object
    if(!artist){
        return res.status(304).json({err: "invalid artist id"});// no such artist exists
    }

    // step3 : reached here means artist exists, so fetch all its playlists 
    const playlists = await Playlist.findOne({owner: artistId}); // note that in the Playlist model we have owner type: mongoose.Types.ObjectId, 
    return res.status(200).json({data: playlists});

}) 


//   /playlist/add/song   - API to add song to a playlist via a user
router.post("/add/song", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1 : fetch the song id and playlist id 
    const currentUser = req.user;
    const {songId, playlistId} = req.body;

    // step 2 : check if such playlist and song both are valid or not 
    const playlist = await Playlist.findOne({_id: playlistId});
    const song = await Playlist.find({_id: songId});
    if(!playlist){
        return res.status(304).json({err: "playlist doesnt exist"});
    }
    if(!song){
        return res.status(304).json({err: "song doesnt exists"});
    }

    // reached here means playlist and song both exists, lets now check if user has access to this playlist or not
    // step1 : to add a song we need to check if the user adding a song has access to add it or not ? (to add a song to playlist user must be a 'collaborator' or 'owner of the playlist')
    if(playlist.owner == currentUser._id){ // if curr user is neighter the owner nor the collaborator of this playlist 
        return res.status(400).json({err: "Not allowed"});
    }

    // reached here means user has access to add songs in playlist, so add the song in to playlist
    playlist.songs.push(songId);  // inside the songs array of playlist, each song is stored by its mongoseid
    await playlist.save(); // saving changes to the db

    return res.status(200).json(playlist);
})

module.exports = router;
```


# Video 15 - lets now test all our Song.js and Playlist.js APIs 
 
lets now test all our APIs one by one and see if theres some correction needed to be done.

`Routes/song.js`  (here we have all song related APIs)
```js
// here all the song related routes API will be stored 

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

// /song/create
router.post("/create", passport.authenticate("jwt", {session: false}) , async (req,res) => {   // post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time

    // step1 : to create a song we need the name(title), thumbnail, track, artist 
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){ // if any field is not complete do not create song
        return res.status(301).json({err: "Insufficient song data"});
    }

    const artist = req.user._id;  // this way the id generated while creating the user will fetch the artist
    const songDetails = {name, thumbnail, track, artist};
    
    // reached here means everything is fine, so create a song based on 'Song' schema model
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);

});


//    /song/get/mysongs
router.get("/get/mysongs", passport.authenticate("jwt" ,{session: false}), async (req,res) => {// post(route, middleware fun, callback func), note we have set the session:false because we want that every time user creates a new song, it has to be authorized using its token every time

    // step1 : reached here means user is authenticated, so we need to now get all the songs whos artist=user._id
    const songs = await Song.find({artist: req.user._id});  // .findOne() only finds single thing,   .find() will help find all the songs that matched the condition of {artist: req.user._id}
    return res.status(200).json({data: songs});

})


//    /song/get/artist    - get route to get all the songs published by a certian artist 
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1: get the artist's id from req.body  
    const {artistId} = req.params;  // note that we should not take input from req.body in .get() method, so we will fixed it now using req.params
    
    // fetch the artist(user) whose id is artist id
    const artist = await User.findOne({_id: artistId}); 
    if(!artist){ // if such artist doesn't exists 
        return res.status(301).json({err: "Artist doesn't exists"});
    }

    // step2 : fetch all the songs whole artist: artistId
    const songs = await Song.find({artist: artistId});    // .find() is used to get all the values   .findOne() is used to get only a single value
    return res.status(200).json({data: songs});     

})

//     /song/get/songname/baarish-song      - get route to get all the songs with exact title - eg. 'baarish'
router.get("/get/songname/:songName", passport.authenticate("jwt", {session: false}), async (req, res) => {
    
    // step1 : get the song name from user 
    const {songName} = req.params;

    // step2 : fetch all the songs with name: songName and return them
    // here we can add the 'pattern matching' functionality later maybe using regx, such that when a user searched 'baar' the 'baarish' song appears 
    const songs = await Song.find({name: songName});
    return res.status(200).json({data: songs});
})


module.exports = router;
```

`Routes/playlist.js`(here we have all playlist related APIs)
```js

const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const Playlist = require("../models/Playlist");

// .post route to create playlist,     /playlist/create    
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {


    // step1 : to create a new playlist we need 'playlistName' 'thumbnail' 'songs' and 'owner' 'collaboratrs'
    // the owner is the one creating the playlist so we do not need to get that from req.body, we can fetch it by ourselves
    const currUser = req.user; // we got this from req because in middleware fun we authenticated the user
    const {name, thumbnail, songs} = req.body;

    if(!name || !thumbnail || !songs ){
        return res.status(301).json({err: "insufficient data to create a playlist"});
    }

    // step2 : combine all the playlist data and create a playlist with all that
    const playlistData = {name, thumbnail, owner:currUser._id, songs, collaborators:[]}; // IMP note: in the 'Playlist' model we have created the owner type as  type: mongoose.Types.ObjectId, thats why here we set {owner: currUser._id} initially there are no collaborators
    
    const playlist = await Playlist.create(playlistData);  // error

    // console.log("reached line 27");

    return res.status(200).json(playlist);
     
});


/*     /playlist/:playlistId   

            note that we used `:` column before playlist id because if we call a route `www.abc.com/login` then it will 
                    only trigger when we give proper `www.abc.com/login` route, but when we use /playlist/:playlistId   in a API function 
                    then this means that 'playlistId' is a variable value i.e it can have any type of value in place of 'playlistId' and this API will be called
                    for eg. if i type   '/playlist/12dsf' '/playlist/abcs2'  '/playlist/okns' then also this API function will call. coz `:` opearator makes a value as variable
*/

// get route API - to get a playlist with a certain playlistid match
router.get("/get/playlist/:playlistId", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1 : we discussed earlier then we should not take any thing from req.body in a .get() API coz it is not a good practice, thats why we used the `:` symbol using which we can fetch the playlist id from the route itself (given by user)
    const playlistId = req.params.playlistId; // fetched data from the route (without using req.body)

    // step2 : search for this playlist with given playlist id
    const playlist = await Playlist.findOne({_id: playlistId});

    if(!playlist){ // no such playlist exists 
        return res.status(301).json({err: "invalid playlist id"})
    }

    return res.status(200).json(playlist);
      
}) 

//  /playlist/get/artist/:artistId   get route to get all the playlist created by an artist (artist id)
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}), async (req,res) =>{

    // step 1 : get the artist id (not from req.body) but  from route parameters
    const artistId = req.params.artistId;
    
    // step2 : check if such artist exists or not
    const artist = await User.findOne({_id: artistId});  // note : _id is a unique id assigned by mongoDb to any schema object
    if(!artist){
        return res.status(304).json({err: "invalid artist id"});// no such artist exists
    }

    // step3 : reached here means artist exists, so fetch all its playlists 
    const playlists = await Playlist.find({owner: artistId}); //playlist can be more then 1, note that in the Playlist model we have owner type: mongoose.Types.ObjectId, 
    return res.status(200).json({data: playlists});

}) 


//   /playlist/add/song   - API to add song to a playlist via a user
router.post("/add/song", passport.authenticate("jwt", {session: false}), async (req,res) => {

    // step1 : fetch the song id and playlist id 
    const currentUser = req.user;
    const {songId, playlistId} = req.body;

    // step 2 : check if such playlist and song both are valid or not 
    const playlist = await Playlist.findOne({_id: playlistId});
    const song = await Playlist.find({_id: songId});
    if(!playlist){
        return res.status(304).json({err: "playlist doesnt exist"});
    }
    if(!song){
        return res.status(304).json({err: "song doesnt exists"});
    }

    // reached here means playlist and song both exists, lets now check if user has access to this playlist or not
    // step1 : to add a song we need to check if the user adding a song has access to add it or not ? (to add a song to playlist user must be a 'collaborator' or 'owner of the playlist')
    if(playlist.owner != currentUser._id && playlist.collaborators.contains(currentUser)){ // if curr user is neighter the owner nor the collaborator of this playlist 
        return res.status(400).json({err: "Not allowed"});
    }

    // reached here means user has access to add songs in playlist, so add the song in to playlist
    playlist.songs.push(songId);  // inside the songs array of playlist, each song is stored by its mongoseid
    await playlist.save(); // saving changes to the db

    return res.status(200).json(playlist);
})

module.exports = router;
```


here are the mentioned APIs that we will test :- 
```
Account APIs
- /register ✔️
- /login ✔️

Songs APIs
- /song/create ✔️
- /get/mysongs ⚠️
- /get/artist/:artistId ⚠️
- /get/songname/:songName

Playlist APIs
- /playlist/create
- /playlist/get/playlist/:playlistId
- /playlist/get/playlist/artist/:artistId
- /playlist/add/song
```
------
`/Register` API testing:- 
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288667928-58eea4e3-1d72-4f18-9f50-b54179caa5bb.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T072146Z&X-Amz-Expires=300&X-Amz-Signature=682dcf2979e7f56f21c109c932acc51ccfcc3c6e19540e7f402fd2cb3e92f170&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

----

`/login` API testing :- 
![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288668905-fa533c83-e794-4bbc-a145-74d778928c13.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T072529Z&X-Amz-Expires=300&X-Amz-Signature=ff875c84faff765c37937553da6f330caf804cffd476b5c68f0ea722059563fc&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

----
`/song/create` API teting :- 
```
note : only authorized user can create song coz we used the passport.authenticate("jwt"), so to clear that huddle, go to POSTMAN and inside ur API go to 'authorization' tab and select 'bearer token' then in the input field on the left copy the token of the user in there and if user is valid he will be authorized, and will be able to create a song

```

lets authorize us as 'sakil' and pass his token, 
lets create 2 songs 'hawa-hawa' and 'pani-pani' , artist of both these song will be 'sakil' 

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288670149-c7835da2-995a-4628-b587-5881be3868fb.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T073050Z&X-Amz-Expires=300&X-Amz-Signature=eb08f729e8a76235980e020c936dc48f9eab79520bca964db5aee6f0e95e82be&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288670641-bd1f0875-a417-4b61-a1a2-b30cc2165ece.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T073251Z&X-Amz-Expires=300&X-Amz-Signature=218bdc930c53f5d85a4f77f8271e6c2a01fdced1a91df53ba94b378a17c02b53&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

---
`/song/get/mysongs` API testing :- 

ERROR⚠️ - all songs are having same artist: ids for some reason  

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288671988-d9e9f0ff-ffad-42d1-9530-3fdf740b55c1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T073834Z&X-Amz-Expires=300&X-Amz-Signature=3d0b0bf96dedc92d39f222b5585d3d38799b77e5798ee50e90cca5da06b89d57&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288675479-4d01926b-bc26-4e3c-a92f-68dfe77e101e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T074905Z&X-Amz-Expires=300&X-Amz-Signature=a493a4624fd012392e0ec9e0ebdbf9a96dccfed25419a897a1d5392cea3b456e&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)

----
`/get/artist/:artistId ` API testing :- 

ERROR⚠️ - songs from user are not able to be fetched due to error in /mysongs API 

![](https://github-production-user-asset-6210df.s3.amazonaws.com/124666305/288678581-f152c624-e13e-4861-920b-a7ddaaa805bd.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231207T075936Z&X-Amz-Expires=300&X-Amz-Signature=93ef59f3f8b5b632e402087a6a1204c9f1cbfb4d7e9d0905795e2c6ccd1e2d47&X-Amz-SignedHeaders=host&actor_id=124666305&key_id=0&repo_id=727325368)



# video 17 - lets install tailwaind css 

go inside the spotify_backend directory through terminal and run the commands mentioned in the below file :- 

Tailwind version 2 reference : [https://v2.tailwindcss.com/docs/guides/create-react-app](https://v2.tailwindcss.com/docs/guides/create-react-app)

# Video 18 - setting up router 

we need to install some packages for Router 
```bash
npm i react-router-dom
```

`App.js`
```js 
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<h1>Home Page</h1>} />; */}
            <Route path="/" element={<Home/>} />;
            <Route path="/error" element={<h1>ERROR Page</h1>} />;
          </Routes>
        </BrowserRouter>
    </div>
  );
}

const Home = () => {
  return (
    <h1>HOME PAGE</h1>
  )
}
export default App;

```
yes its working fine.
