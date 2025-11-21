import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

// Componentes e Páginas
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile'; // Importe a nova página de perfil

const App = () => {
    const token = localStorage.getItem('token');
    let user = null;
    let isAdmin = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                user = decodedToken.user;
                isAdmin = user.isAdmin;
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error("Token inválido:", error);
            localStorage.removeItem('token');
        }
    }

    return (
        <Router>
            <Navbar user={user} />
            <div className="container">
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                    
                    {/* Rotas Protegidas */}
                    <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/create-post" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> {/* Rota adicionada */}
                    
                    {/* Rota de Admin */}
                    <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
