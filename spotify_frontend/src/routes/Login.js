import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import ReactDOM from 'react-dom';

import { Icon } from '@iconify/react'; 
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers'; // necessary for making call to the APIs at backend
import { useCookies } from 'react-cookie'; // necessary to access token from cookies 

import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';

export default function LoginComponent(){

    //⭐ lets create some states to store input field's data 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookie, setCookie] = useCookies(["token"]);  // state for cookies
    const navigate = useNavigate(); // state for navigation i.e for eg to navigate to home page ones user is logged in successfully


    
    // this fuction will run whenever 'login' button is clicked
    const login = async () => {

        const data = {email, password}; // fetch the data stored in useState 
        
        // now we have the data in json format, so lets send it to the fun 'makeUnauthenticatedPOSTRequest' which will later send it to the API at backend 
        const response = await makeUnauthenticatedPOSTRequest("/auth/login", data); // 
        
        if(response && !response.err){ // if we did got a response ,and response does not have a 'err' key or error key that we send in the backend code
            // user exists and user credentials are stored in response (sent by the backend api of /auth/login)
            // console.log(response);
 
            // lets store the token of user into cookies for smooth authentication purpose (login)
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30); // set date to 30 days later coz we need to store cookies for 30 days only
            console.log(cookie.token);
            setCookie("token", token, {path: "/" ,expires: date}); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
            alert('log in successful');
            navigate("/home"); // go to home page when user acc is created, used from 'useNavigate' hook state
        }else{
            alert("failure");
        }
    }

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
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput 
                    label="Password" 
                    placeholder="Password"
                    className="my-3"
                    value={password}
                    setValue={setPassword}
                />
                <div className='buttonContainer w-full flex justify-end my-5'>
                    <button className='bg-spotify-green font-semibold p-3 px-10 rounded-full' onClick={(e) => {
                        e.preventDefault();  // by default form buttons have some default behaviour, so this is how we prevent that 
                        login(); // call login function when one clicks the button
                    }}>
                        LOG IN
                    </button>
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