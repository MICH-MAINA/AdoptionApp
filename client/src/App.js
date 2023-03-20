
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/signUp';
import Dashboard from './components/dashboard';
import ParentProfile from './components/parentProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp/>} />
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path="/profile" element={<ParentProfile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
