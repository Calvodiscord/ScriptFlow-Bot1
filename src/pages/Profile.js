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
                <p>Em breve, aqui você poderá ver seus posts, seguidores, etc.</p>

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

export default Profile;```

---

### 5. `frontend/src/pages/Login.js` (Completo)
*   _Substitua o conteúdo. A única mudança é a adição das classes CSS `card` e `card-content`._

```javascript
import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erro no login:', error.response?.data?.msg);
            alert(error.response?.data?.msg || 'Credenciais inválidas.');
        }
    };

    return (
        <div className="card">
            <div className="card-content">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={onChange} required />
                    <input type="password" name="password" placeholder="Senha" onChange={onChange} required />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;#### **Arquivo para Editar: `frontend/src/App.js`**

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
