import React from 'react';
import {Link} from 'react-router-dom';
// import ReactDOM from 'react-dom';

import { Icon } from '@iconify/react';

import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';

export default function LoginComponent(){

    return (

        <div className='w-full h-full flex flex-col items-center'>
            
            <div className="logo w-full flex justify-center p-2 border-b border-solid border-gray-300 ">
                <Icon icon="logos:spotify" width='130' />
            </div>     

            <div className='inputRegion w-1/3 py-10 '>
                {/* will have 2 inputs email and pass and have my signup button */}
                <div className='font-bold mb-8'>
                    To continue, log in to Spotify
                </div>
                <TextInput 
                    label="Email ID or username" 
                    placeholder="Email ID or username" 
                    className="my-3"
                />
                <PasswordInput 
                    label="Password" 
                    placeholder="Password"
                    className="my-3"
                />
                <div className='buttonContainer w-full flex justify-end my-5'>
                    <button className='bg-spotify-green font-semibold p-3 px-10 rounded-full'>LOG IN</button>
                </div>

                <div className='w-full border border-gray-300'> 
                </div>

                <div className='font-semibold my-5'>
                    Don't have an account ?
                </div>

                <div className='w-full border-2 border-gray-400 text-gray-700 py-3 rounded-full'>
                    <Link to="/signup">  {/* note : anchor is not efficient, link is efficient as it will load only those components that are changed, those unchanged will not be reloaded */}
                        SIGN UP FOR SPOTIFY
                    </Link>
                </div>

            </div>
            
        </div>
    
    )
}