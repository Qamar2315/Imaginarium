// src/App.js (Example)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home'; // Requires authentication
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'; // Import the Navbar
import CharacterList from './components/CharacterList'; // Example protected component


function App() {
  return (
    <AuthProvider>  {/* Wrap your app with AuthProvider */}
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/" element={ 
                  <PrivateRoute>  {/* Protect Home route */}
                    <Home/>
                    <CharacterList/> {/* Nested protected route */}
                  </PrivateRoute>
              }/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;