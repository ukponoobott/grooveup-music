import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<h1>Home Page</h1>} />; */}
            <Route path="/" element={<Home/>} />;
            <Route path="/error" element={<h1>ERROR Page</h1>} />;
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
