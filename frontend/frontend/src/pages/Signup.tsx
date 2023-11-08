import axios from 'axios';
import { useState } from 'react';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function submitRegistration(e: any) {
        e.preventDefault();
        client.post(
            "/typinggame/register",
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function(res) {
            client.post(
                "/typinggame/login",
                {
                    username: username,
                    password: password
                }
            )
        });
    }
    return (
        <form onSubmit={e => submitRegistration(e)}>
            <textarea value={username} onChange={e => setUsername(e.target.value)}></textarea>
            <textarea value={email} onChange={e => setEmail(e.target.value)}></textarea>
            <textarea value={password} onChange={e => setPassword(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Signup;