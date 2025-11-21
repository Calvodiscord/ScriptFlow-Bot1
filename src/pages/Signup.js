import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await register(formData);
            localStorage.setItem('token', data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erro no cadastro:', error.response?.data?.msg);
            alert(error.response?.data?.msg || 'Erro ao criar conta.');
        }
    };

    return (
        <div className="card">
            <div className="card-content">
                <h2>Cadastre-se</h2>
                <form onSubmit={onSubmit}>
                    <input type="text" name="username" placeholder="Nome de usuário" onChange={onChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={onChange} required />
                    <input type="password" name="password" placeholder="Senha (mínimo 6 caracteres)" minLength="6" onChange={onChange} required />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
