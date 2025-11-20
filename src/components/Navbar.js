import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="nav-brand">InstaClone</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/">Feed</Link>
                            <Link to="/create-post">Novo Post</Link>
                            {user.isAdmin && <Link to="/admin">Admin</Link>}
                            <button onClick={handleLogout}>Sair</button>
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
