import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload(); // Correção para o botão sair funcionar corretamente
    };

    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="nav-brand">ScriptFlow</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/">Feed</Link>
                            <Link to="/create-post">Novo Post</Link>
                            {/* Novo link para o perfil do usuário */}
                            <Link to="/profile">Perfil</Link>
                            <button onClick={handleLogout} className="logout-button">Sair</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Cadastro</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
