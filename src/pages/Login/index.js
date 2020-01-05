import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Login({ history }) {
    const [login, setLogin] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/v1/users', { login });
        const { _id } = response.data;
        
        localStorage.setItem('user', _id);
        history.push('/app/replacement');
    }

    return (
        <>
            <div className="containerLogin">
                <div className="contentLogin">
                    <p>
                        Maneira fácil de substituir texto
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login">LOGIN *</label>
                        <input 
                            type="text"
                            id="login"
                            placeholder="Informe seu login"
                            value={login}
                            onChange={event => setLogin(event.target.value)}
                        />

                        <button className="btn" type="submit">Logar</button>
                    </form>
                </div>
            </div>
        </>
    )
};