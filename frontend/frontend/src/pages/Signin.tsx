import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isAnonymousState } from "../recoil/Atom";
import * as settings from "../settings";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const Signin = () => {
    const [isAnonymous, setIsAnonymous] = useRecoilState(isAnonymousState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        axios.get(`${settings.API_SERVER}/typinggame/user`)
        .then(function(res){
            setIsAnonymous(false);
        })
        .catch(function(error){
            setIsAnonymous(true);
        });
    }, []);
    function submitSignin(e: any) {
        e.preventDefault();
        axios.post(
            `${settings.API_SERVER}/typinggame/login`,
            {
                username: username,
                password: password
            }
        ).then(function(res){
            setIsAnonymous(false);
        });
    }
    return (
        <form onSubmit={e => submitSignin(e)}>
            <textarea value={username} onChange={e => setUsername(e.target.value)}></textarea>
            <textarea value={password} onChange={e => setPassword(e.target.value)}></textarea>
            <button>Submit</button>
        </form>
    )
}

export default Signin;