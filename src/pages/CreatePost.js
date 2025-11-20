import React, { useState } from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Por favor, selecione uma imagem.');
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', caption);

        try {
            await createPost(formData);
            navigate('/');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Não foi possível criar o post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Criar Novo Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
                <input type="text" placeholder="Escreva uma legenda..." value={caption} onChange={(e) => setCaption(e.target.value)} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
