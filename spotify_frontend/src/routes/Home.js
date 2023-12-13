import React from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg'
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';


export default function Home(){
    return(
        <div className='h-full w-full flex'>

            {/* this will be the left pannel */}
            <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'>
                <div>
                    <div className='logoDiv p-5' >
                        <img src={spotify_logo} alt="spotify logo" width={125} />
                    </div>
                    <div className='py-5'>
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
                        <IconText iconName={"uil:search"} displayText={"Search"} />
                        <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
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
            <div className='h-full'>
                
            </div>

        </div>
    )
}