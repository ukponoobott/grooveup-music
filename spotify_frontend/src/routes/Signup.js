import React from 'react';
import {Link} from 'react-router-dom';
// import ReactDOM from 'react-dom';

import { Icon } from '@iconify/react';

import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';


export default function SignupComponent(){

    return (

        <div className='w-full h-full flex flex-col items-center'>
            
            <div className="logo w-full flex justify-center p-2 border-b border-solid border-gray-300 ">
                <Icon icon="logos:spotify" width='130' />
            </div>     

            <div className='inputRegion w-1/3 py-10 '>
                {/* will have 2 inputs email and pass and have my signup button */}
                <div className='font-bold mb-8 text-2xl'>
                    Sign Up for free to start listening.
                </div>
                <TextInput 
                    label="Email address" 
                    placeholder="Enter your email" 
                    className="my-3"
                />
                <TextInput 
                    label="Confirm Email address" 
                    placeholder="Enter your email again" 
                    className="my-3"
                />
                <PasswordInput 
                    label="Create Password" 
                    placeholder="Enter a strong password"
                    className="my-3"
                />
                <TextInput 
                    label="What should we call you ?" 
                    placeholder="Enter a profile name" 
                    className="my-3"
                />
                <div className='buttonContainer w-full flex justify-center my-5'>
                    <button className='bg-spotify-green font-semibold p-3 px-10 rounded-full'>
                        SIGN UP
                    </button>
                </div>

                <div className='w-full border border-gray-300'> 
                </div>

                <div className='font-semibold my-5'>
                    Already have an account ?
                </div>

                <div className='w-full border-2 border-gray-400 text-gray-700 py-3 rounded-full'>
                    <Link to="/login">
                        LOG IN INSTEAD
                    </Link>
                </div>

            </div>
            
        </div>
    
    )
}