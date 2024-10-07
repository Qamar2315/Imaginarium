// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Characters from "./pages/Characters";
import CreateCharacter from "./pages/CreateCharacter";
import Chat from "./pages/Chat";
import EditCharacter from "./pages/EditCharacter";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} /> {/* Home is now open */}
          <Route
            path="/create-character"
            element={
              <PrivateRoute>
                <CreateCharacter />
              </PrivateRoute>
            }
          />
          <Route
            path="/characters"
            element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:characterId" // Route with dynamic parameter for character ID
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:characterId" // Route with dynamic parameter for character ID
            element={
              <PrivateRoute>
                <EditCharacter />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
