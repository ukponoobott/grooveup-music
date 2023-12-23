import React from 'react';
import {useState, useEffect} from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg'
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import {Howl, Howler} from 'howler';

// note : we want song to play on all pages and routes even if we change the page or route for logged in users and not only on 'myMusic' page, so for that we defined context with 'currSong' and 'setCurrentSong' values to use those values on each page for logged in users
 

export default function MyMusic(){

    const [songData, setSongData] = useState([]); // songData is a array of obj where each obj will be single song obj 
    const [soundPlayed, setSoundPlayed] = useState(null); // this state stores the current song playing

    // this function will work when someone plays music (eg. clicks on single song card )
    // this below code is taken from : https://github.com/goldfire/howler.js
    const playSound = (songSrc) => {

        if(soundPlayed){  // if a song is alrady playing then stop it first
            soundPlayed.stop();
        }
        
        let sound = new Howl({ 
            src: [songSrc], // get the src of song that user wants to play now
            html5: true
        });

        setSoundPlayed(sound); // update soundPlayed with the current song 
        sound.play();
    }
    
    useEffect(() => {  // imp note : we can not make useEffect async directly, then how can me mak makeAuth.. function async ?, the solution is that we can make another function inside the useEffect and make it async then inside this function call teh makeAuth.. function to call API at backend to return some response  
        
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs"); // from backend API will return 'all songs' created of user in form of array of songs objects
            // note : when we log this response we can see that this 'response' is an object that has a 'data' as 'key' whose value is the 'array' of all songs objects that we need 
            setSongData(response.data); // save this array of song obj in the state
        }
        getData();
        
    }, []); 

    // const songData = [
    //     {
    //         thumbnail:"https://images.unsplash.com/photo-1702750722255-93420fcd21f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
    //         artist: "Yashasvi Yadav", // originally this will be a object of artist's all info
    //         name: "SHINE OUT"
    //     },
    //     {
    //         thumbnail:"https://images.unsplash.com/photo-1703028408891-934fc23fbc04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
    //         artist: "Yashasvi Yadav", // originally this will be a object of artist's all info
    //         name: "Mountains"
    //     },
    //     {
    //         thumbnail: "https://images.unsplash.com/photo-1702165640211-a08754370205?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
    //         artist: "Caery Mils", // originally this will be a object of artist's all info
    //         name: "Yellow Flower"
    //     }
    // ]

    return(
        <div className='h-full w-full flex'>

            {/* this will be the left pannel */}
            <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'>
                <div>
                    <div className='logoDiv p-5' >
                        <img src={spotify_logo} alt="spotify logo" width={125} />
                    </div>
                    <div className='py-5'>
                        <IconText iconName={"material-symbols:home"} displayText={"Home"}  />
                        <IconText iconName={"uil:search"} displayText={"Search"} />
                        <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
                        <IconText iconName={"bxs:music"} displayText={"My Music"} active />

                    </div>

                    <div className='pt-5'>
                        <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
                        <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
                    </div>

                </div>

                <div className='px-6 '>
                    <div className='border border-gray-400 text-white flex w-2/5 rounded-full flex justify-center items-center py-1 cursor-pointer hover:border-white'>
                        <Icon icon="humbleicons:globe" fontSize={18} />
                        
                        <div className='ml-1 text-sm font-semibold'>English</div>
                    </div>
                </div>
                
            </div>

            {/* this will be the right pannel */}
            <div className='h-full w-4/5 bg-app-black'>
                    
                {/* in the right pannel this will be Navbar  */}
                <div className='navbar h-1/10 w-full bg-black bg-opacity-40 flex items-center justify-end'>
                    
                    <div className='h-full w-1/2 flex items-center'>
                        <div className='h-full w-3/5 flex items-center justify-around '>
                            <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/>
                            <TextWithHover displayText={"Download"}/>
                            <div className='h-1/2 border border-gray-500'></div>
                        </div>
                        <div className='h-full w-2/5 flex items-center justify-around '>
                            <TextWithHover displayText={"Upload Song"}/>
                            <div className='h-10 w-10 py-4 px-4 bg-white flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-gray-200'>
                                YY
                            </div>
                        </div>

                    </div>
                </div>

                {/* this will be content below navbar */}
                <div className='content h-9/10 p-8  text-white overflow-auto '>
                    
                    {/* song cards container */}
                        
                        <div className='text-left text-xl font-semibold pl-2 pb-4'>
                            My Songs
                        </div>
                        <div className='space-y-3 overflow-auto'>
                            {
                                // songData is array of songs, where each song is stored in form of JSON object
                                songData.map((item) => {  // 'item' is individual songs object
                                    return (    
                                        <SingleSongCard info={item} playSound={playSound}/>
                                    )
                                })
                            }
                        </div>


                </div>
                
            </div>

        </div>
    )
}
