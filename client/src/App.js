
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/signUp';
import Dashboard from './components/dashboard';
import ParentProfile from './components/parentProfile';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/profile" element={<ParentProfile/>} />
          <Route path='/login'element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
