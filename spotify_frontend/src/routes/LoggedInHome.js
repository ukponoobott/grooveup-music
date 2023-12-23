import React from 'react';
import {useState} from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg'
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import {Howl, Howler} from 'howler';


// each playlist view stored in array of JSON objs where each object has data of each individual playlist 
const focusCardsData = [
    {
        title:"Peaceful Piano", 
        description:"Relax and indulge with peacuful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Deep Focus",
        description:"Keep calm and focus with this music",
        imgUrl:"https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        title:"Instrumental Study",
        description:"Focus with soft study music",
        imgUrl:"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"
    },

    {
        title:"Focus Flow",
        description:"Up tempo instrumental beats",
        imgUrl:"https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww"
    },
    {
        title:"Beats to think to",
        description:"focus with deep techno and tech house",
        imgUrl:"https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"
    }
    
];  

const spotifyCardsPlaylist = [
    {title:"Todays Top Hits", description:"All top hits from 24hrs", imgUrl:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"},
    {title:"Rap Cavier", description:"For all the rap lovers", imgUrl:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D"},
    {title:"All Out 2010s", description:"lets go back to the 10s time", imgUrl:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww"},
    {title:"Rock Classics", description:"Rock with some rock music", imgUrl:"https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww"},
    {title:"Punk", description:"Some of the Punk hits of this year", imgUrl:"https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuayUyMHJvY2t8ZW58MHx8MHx8fDA%3D"},
];

export default function LoggedInHome(){

    const [soundPlayed, setSoundPlayed] = useState(null); // this state stores the current song playing
    const [isPaused, setIsPaused] = useState(true); // state to store if curr song is played or paused rn, initially song is paused

    // this play sound func we will use in the song play bar at the bottom of home page (10%)
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

    // this func will pause the curr sound
    const pauseSound = () => {
        soundPlayed.stop();
    }

    // this func will togle the sound -> if its being played then this func stops it, if it is stoped then this func playes it
    const togglePlayPause = () => {
        if(isPaused){ 
            playSound("https://res.cloudinary.com/drrlxyc7e/video/upload/v1703334725/eytgdx92yujddidxdqv8.mp3"); // call the above playSound Func
            setIsPaused(false); // update isPaused varaible
        }
        else{
            pauseSound(); // call the above pause sound func
            setIsPaused(true);// update isPaused varaible
        }
    }
    

    return(
        <div className='h-full w-full bg-app-black'>
        
            {/* this will be the upper 90% screen (without song play bar) */}
            <div className='h-9/10 w-full flex '>

                {/* this will be the left pannel */}
                <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'>
                    <div>
                        <div className='logoDiv p-5' >
                            <img src={spotify_logo} alt="spotify logo" width={125} />
                        </div>
                        <div className='py-5'>
                            <IconText iconName={"material-symbols:home"} displayText={"Home"} active/>
                            <IconText iconName={"uil:search"} displayText={"Search"} />
                            <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
                            <IconText iconName={"bxs:music"} displayText={"My Music"} />
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
                    <div className='content h-9/10 p-8 pt-0 text-white overflow-auto'>
                        <PlaylistView titleText={"Focus"} cardsData={focusCardsData}/>
                        <PlaylistView titleText={"Spotify Playlists"} cardsData={spotifyCardsPlaylist}/>
                        {/* <PlaylistView titleText={"Focus"} cardsData={focusCardsData}/> */}
                        {/* <PlaylistView titleText={"Spotify Playlists"}/> 
                        <PlaylistView titleText={"Sounds of India"}/>  */}
                    </div>
                    
                </div>
            </div>

            {/* this will be song Play bar 10% screen */}
            <div className='h-1/10 w-full bg-black bg-opacity-30 flex items-center '>

                {/* this will be left part of song play bar */}
                <div className='w-1/4 h-full flex items-center p-4' >
                    <img 
                        // src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Metro_Boomin_-_Heroes_%26_Villains.png/220px-Metro_Boomin_-_Heroes_%26_Villains.png"
                        src="https://iili.io/JAphpSI.png"
                        className='h-11 w-11 rounded '
                        alt="art cover"
                    />
                    <div className='pl-4'>
                        <div className='text-white text-sm text-left cursor-pointer hover:underline max-w-max'>Trance</div>
                        <div className='text-gray-400 text-xs text-left cursor-pointer hover:underline max-w-max'>Metro Boomin</div>
                    </div>
                </div>

                {/* this will me middle part of song play bar */}
                <div className='w-2/4 h-full flex justify-center flex-col items-center '>

                     <div className='w-1/3 flex justify-center items-center justify-between  h-full'>
                        {/* song play,pause,repeat etc, controls */}
                        <Icon 
                            icon="mi:shuffle" 
                            fontSize={20}  
                            className='text-gray-500 cursor-pointer hover:color-white hover:text-white'
                        />
                        <Icon 
                            icon="fluent:previous-32-filled" 
                            fontSize={20} 
                            className='text-gray-500 cursor-pointer hover:text-white' 
                        />
                        <Icon  /* Play/Pause icon*/
                            icon={isPaused?"carbon:play-outline":"carbon:pause-outline"} 
                            fontSize={35} 
                            className='text-gray-500 cursor-pointer hover:text-white'
                            onClick={
                                ()=>{togglePlayPause()}
                            }
                        />
                        <Icon 
                            icon="fluent:next-32-filled" 
                            fontSize={20} 
                            className='text-gray-500 cursor-pointer hover:text-white'
                        />
                        <Icon 
                            icon="material-symbols:repeat" 
                            fontSize={20} 
                            className='text-gray-500 cursor-pointer hover:text-white'
                        />
                     </div>

                     <div>
                        {/* song progress bar */}
                     </div>
                </div>

                <div className='w-1/4 h-full' >
                     
                </div>

            </div>
        </div>
    )
}

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className='text-white w-full mt-8'>
            <div className='text-2xl font-semibold mb-5 text-left'>{titleText}</div>
            <div className='w-full flex justify-between space-x-4'>
                {/* cardsData will be an array of JSON objects where each object has data for each card */}
                {
                    cardsData.map((item) => {
                        return(
                            <Card 
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        )
                    })
                }

                {/* OLD NON GENERIC APPROACH ↘️ */}
                {/* <Card title={"Peaceful Piano"} description={"Relax and indulge with peacuful piano pieces"} imgUrl={"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Deep Focus"} description={"Keep calm and focus with this music"} imgUrl={"https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D"}/>
                <Card title={"Instrumental Study"} description={"Focus with soft study music"} imgUrl={"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Focus Flow"} description={"Up tempo instrumental beats"} imgUrl={"https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww"}/>
                <Card title={"Beats to think to"} description={"focus with deep techno and tech house"} imgUrl={"https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/> */}
                
            </div>
        </div>
    )
}

const Card = ({title, description, imgUrl}) => {
    return(
        <div className='bg-black bg-opacity-40 w-1/5 p-4 rounded-lg '>
            <div className='pb-4 bt-2'>
                <img 
                    className='w-full rounded-md'
                    src={imgUrl}
                    alt="playlist cover"
                />
            </div>
            <div className=' font-semibold text-left py-3'>{title}</div>
            <div className='text-sm text-gray-500 text-left'> {description} </div>
        </div>
    )
}
