import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useCookies} from 'react-cookie';  // this is a 'state' hook will be used for storing token in cookies 

import { Icon } from '@iconify/react';

import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelpers';

export default function SignupComponent(){

    //⭐ lets create some states to store input field datas 
    const [email, setEmail] = useState(""); // empty string means initially set their values to ""
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [cookie, setCookie] = useCookies(["token"]); // use cookies state returns there 2 things
    const navigate = useNavigate();  // import this {hook} from react-router-dom to navigate from 1 route to another

    // ERROR FIXING STEPS :- 
    // console.log(email); // we can see that as we change value in email field,  the new value gets saved in value of that field
    // console.log(setEmail);


    // this fuction will run whenever 'signup' button is clicked
    const signUp = async () => {
    
        if(email !== confirmEmail){ // do not sign up
            alert("Email and confirm email must have same value");
            return;
        }

        const data = {email, password, username, firstName, lastName};// fetch the data stored in useState 
        
        // now we have the data in json format, so lets send it to the fun 'makeUnauthenticatedPOSTRequest' which will later send it to the API at backend 
        const response = await makeUnauthenticatedPOSTRequest("/auth/register", data); // 
        
        if(response && !response.err){ // if we did got a response ,and response does not have a 'err' key or error key that we send in the backend code
            // user created and user credentials are stored in response
            // console.log(response);
 
            // lets store the token of response into cookies for authentication purpose (login)
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30); // set date to 30 days later coz we need to store cookies for 30 days only
            setCookie("token", token, {path: "/" ,expires: date}); // to store token in cookies we need to install "npm i react-cookie" package, using this "setCookies(key, value, {options})" we can set cookies, note: path is the cookies path where to store it
            alert('new account created');
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
                <div className='font-bold mb-8 text-2xl'>
                    Sign Up for free to start listening.
                </div>
                <TextInput 
                    label="Email address" 
                    placeholder="Enter your email" 
                    className="my-3"
                    value={email}  // using there we are passing state 'email' as prop to the component TextInpt
                    setValue={setEmail} // whever value changes it will update it
                />
                <TextInput 
                    label="Confirm Email address" 
                    placeholder="Enter your email again" 
                    className="my-3"
                    value={confirmEmail} // storing states 
                    setValue={setConfirmEmail}
                />
                <PasswordInput 
                    label="Create Password" 
                    placeholder="Enter a strong password"
                    className="my-3"
                    value={password} // storing states 
                    setValue={setPassword}
                />
                <TextInput   // todo: for later make sure that in the backend  we generate uniq username for each user
                    label="Username" 
                    placeholder="Enter ur username" 
                    className="my-3"
                    value={username} // storing states 
                    setValue={setUsername}
                />
                <div className='w-full flex space-x-4'>
                    <TextInput 
                        label="First Name" 
                        placeholder="First Name" 
                        className="my-3"
                        value={firstName} // storing states 
                        setValue={setFirstName}
                    />
                    <TextInput 
                        label="Last Name" 
                        placeholder="Last Name" 
                        className="my-3"
                        value={lastName} // storing states 
                        setValue={setLastName}
                    />
                </div>

                <div className='buttonContainer w-full flex justify-center my-5'>
                    <button className='bg-spotify-green font-semibold p-3 px-10 rounded-full' onClick={(e) => {
                        e.preventDefault(); // by default buttons have some default behaviour, so prevent that 
                        signUp(); // call the signup function when this button is clicked
                    }}>
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