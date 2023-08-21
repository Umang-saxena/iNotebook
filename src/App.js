
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
    <>
    <NoteState> 
    <BrowserRouter>
    <Navbar/>
    <Alert message=" This is an Alert" />
    <div className="container">
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/about" element={ <About/> } />
        <Route exact path="/login" element={ <Login/> } />
        <Route exact path="/signup" element={ <SignUp/> } />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
