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