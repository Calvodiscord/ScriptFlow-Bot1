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
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={onChange} required />
                <input type="password" name="password" placeholder="Senha" onChange={onChange} required />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
