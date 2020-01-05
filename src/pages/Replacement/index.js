import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Replacement({ history }) {
    const [fullWords, setFullWords] = useState('');
    const [method, setMethod] = useState('');
    const [words, setWords] = useState('');

    useEffect(() => {
        async function loadReplacement() {
            const user_id = localStorage.getItem('user');
            const response = await api.get(`/v1/users/${user_id}/replacement`);
            const { data } = response;
            
            if (data) {
                setFullWords(data.fullWords);
                setMethod(data.method);
                setWords(data.words);
            };
        };

        loadReplacement();
    }, []);
    
    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');
        const replacement = { fullWords, method };
        
        const response = await api.post('/v1/replacements', replacement, {
            headers: { user_id }
        });

        const newWords = response.data.words.map(w => w = ` ${w}`);

        setWords(newWords);
    };

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem('user');
        history.push('/app');
    };

    return (
        <div className="containerRep">
            <div className="contentRep">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullWords">PALAVRAS</label>
                    <textarea 
                        id="fullWords"
                        placeholder="string1, string2, string3"
                        cols="30"
                        rows="6"
                        value={fullWords}
                        onChange={event => setFullWords(event.target.value)}
                    />
                    <label htmlFor="method">MÉTODO</label>
                    <input 
                        id="method"
                        placeholder="objeto @field"
                        value={method}
                        onChange={event => setMethod(event.target.value)}
                    />
                    <label htmlFor="words">RESULTADO</label>
                    <textarea 
                        id="words" 
                        placeholder="objeto string1 &#10;objeto string2 &#10;objeto string3"
                        cols="30" 
                        rows="6"
                        value={words}
                        readOnly>
                    </textarea>

                    <button type="submit" className="btn">Substituir</button>
                </form>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}