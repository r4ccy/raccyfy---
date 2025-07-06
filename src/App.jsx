import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './components/Layout.jsx';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/home" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
