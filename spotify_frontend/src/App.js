import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './output.css';
import LoginComponent from './routes/Login.js';
import SignupComponent from './routes/Signup.js';
import HomeComponent from './routes/Home.js';

function App() {
  return (
    <div className="App w-screen h-screen font-poppins">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<h1>Home Page</h1>} />; */}
            <Route path="/" element={<Home/>} />;
            <Route path="/error" element={<h1>ERROR Page</h1>} />;
            <Route path="/login" element={<LoginComponent/>} />;
            <Route path="/signup" element={<SignupComponent/>} />
            <Route path="/home" element={<HomeComponent/>} />
          </Routes>
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
