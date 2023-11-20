import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isAnonymousState } from '../recoil/Atom';
import * as settings from '../settings';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: `${settings.API_SERVER}`,
});

const Signup = () => {
    const [isAnonymous, setIsAnonymous] = useRecoilState(isAnonymousState)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function submitRegistration(e: any) {
        e.preventDefault();
        axios.post(
            `${settings.API_SERVER}/typinggame/register`,
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function(res) {
            axios.post(
                `${settings.API_SERVER}/typinggame/login`,
                {
                    username: username,
                    password: password
                }
            );
            setIsAnonymous(false);
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