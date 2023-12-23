

export default function SingleSongCard({info, playSound}){ // 'info' prop will be passed in the myMusic.js to where this info is a object of each song sent my the 'MySong' API from the backend  

    return(

        // this is a single song card, whenver user clicks on any single song card, run the playSound(info.track) function to play that single song track, info.track has the cloudinary track cloud src
        <div className="text-white flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={() => {playSound(info.track)}}> 

            {/* dynamically importing img in a div */}
            <div className="h-12 w-12 bg-cover bg-center" style={{ 
                backgroundImage: `url("${info.thumbnail}")`
            }}>
            </div>

            <div className="flex w-full">

                <div className="pl-4 w-5/6 ">  {/* for song name and artist name*/}
                    <div className="text-white text-left cursor-pointer hover:underline  max-w-max">{info.name}</div> {/* max-w-max means max width of thid div will be equal to max width content inside it needs */}
                    <div className="text-gray-300 text-xs text-left cursor-pointer hover:underline max-w-max">{info.artist.firstName + " " + info.artist.lastName}</div>
                </div>

                {/* for track time */}
                <div className="w-1/6 flex justify-center items-center text-gray-300">  {/* for more and like icon and track time */}
                    3:39
                </div>
            </div>
        </div>
    
    );
}