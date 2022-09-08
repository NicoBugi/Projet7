import './App.css';

import Error from '@/_utils/Error';
import Home from '@/pages/Public/Home';
import Login from '@/pages/Public/Login';
import Signup from '@/pages/Public/Singup';
import User from '@/pages/Public/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Public/Layout';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<Error />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
