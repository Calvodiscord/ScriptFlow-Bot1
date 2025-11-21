// frontend/src/pages/Profile.js - VERSÃO CORRIGIDA

import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Esta linha provavelmente estava faltando

const Profile = () => {
    // Decodifica o token para pegar os dados do usuário logado
    const token = localStorage.getItem('token');
    
    // Verifica se o token existe antes de tentar decodificar
    if (!token) {
        return <div>Você precisa estar logado para ver o perfil.</div>;
    }

    const user = jwtDecode(token).user;

    return (
        <div className="card">
            <div className="card-content">
                <h2>{user.username}</h2>
                <p>Em breve, aqui você verá seus posts e informações.</p>

                {/* A engrenagem de Admin só aparece se o usuário for admin */}
                {user.isAdmin && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid #dbdbdb', paddingTop: '20px' }}>
                        <Link to="/admin" style={{ fontSize: '1.2rem', textDecoration: 'none', color: '#262626' }}>
                            ⚙️ Painel de Controle
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
