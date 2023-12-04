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