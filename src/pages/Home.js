import React, { useEffect, useState } from 'react';
import { getFeedPosts } from '../api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await getFeedPosts();
                setPosts(data);
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Carregando feed...</div>;
    }

    return (
        <div>
            <h1>Feed</h1>
            {posts.length === 0 ? (
                <p>Seu feed está vazio. Siga outros usuários ou crie um post!</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', margin: '20px 0', padding: '10px' }}>
                         {/* Seu backend precisa popular o usuário para exibir o nome */}
                         <h4>{post.user?.username || 'Usuário'}</h4>
                         <img src={post.imageUrl} alt={post.caption} style={{ maxWidth: '100%' }} />
                         <p>{post.caption}</p>
                         <small>Curtidas: {post.likes.length}</small>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
