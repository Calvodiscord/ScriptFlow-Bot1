// frontend/src/pages/Profile.js

import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Profile = () => {
    // Decodifica o token para pegar os dados do usuário logado
    const token = localStorage.getItem('token');
    const user = jwtDecode(token).user;

    return (
        <div className="card">
            <div className="card-content">
                <h2>Perfil de {user.username}</h2>
                <p>Aqui você poderá ver seus posts, seguidores, etc.</p>

                {/* A engrenagem de Admin só aparece se o usuário for admin */}
                {user.isAdmin && (
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/admin" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                            ⚙️ Painel do Admin
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;```

#### **3.2: Adicionar a Rota no `App.js`**

Adicione a nova rota para o perfil.

#### **Arquivo para Editar: `frontend/src/App.js`**

```javascript
// Dentro do <Routes> em App.js

<Routes>
    {/* ... suas rotas de login e signup ... */}
    
    {/* Rotas Protegidas */}
    <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
    <Route path="/create-post" element={user ? <CreatePost /> : <Navigate to="/login" />} />
    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> {/* Adicione esta linha */}
    
    {/* Rota de Admin */}
    <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
</Routes>
