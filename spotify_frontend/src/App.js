import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import './output.css';
import LoginComponent from './routes/Login.js';
import SignupComponent from './routes/Signup.js';
import UploadSong from './routes/UploadSong.js';
import HomeComponent from './routes/Home.js';
import { Cookies, useCookies } from 'react-cookie';
import LoggedInHomeComponent from './routes/LoggedInHome.js';


function App() {
  const [cookie, setCookie] = useCookies(["token"]); // lets use token from cookies

  return (
    <div className="App w-screen h-screen font-poppins">
        <BrowserRouter>
        {
        
          // if token is there in cookies means user has been logged in, so he should only have access to below routes
          cookie.token?(  
          <Routes>
            <Route path="/" element={<Home/>} />;
            <Route path="/home" element={<LoggedInHomeComponent/>} /> {/* this is home component for only logged in users*/}
            <Route path="/uploadSong" element={<UploadSong/>} /> {/* this is home component for only logged in users*/}
            <Route path="*" element={<Navigate to="/home"/>}/>   {/* if user is logged in then if he goes to any route where he is not supposed to eg. /login or /signup then navigate it to /home route */}
          </Routes>
          ):(
            // if token not found in the cookies means user is not logged in, so he should only access these below routes
          <Routes>
            <Route path="/login" element={<LoginComponent/>} />;
            <Route path="/signup" element={<SignupComponent/>} />
            <Route path="/home" element={<HomeComponent/>} />
            <Route path="*" element={<Navigate to="/login"/>}/>   {/* if user is not logged in then if he goes to any route where he is not supposed to eg. / then navigate it to /login route automatically */}

          </Routes>
          )
        }
          
        </BrowserRouter>
    </div>
  );
}

const Home = () => {
  return (
    <h1>HOME PAGE</h1>
  )
}
export default App;
