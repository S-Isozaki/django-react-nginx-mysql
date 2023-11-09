import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isAnonymousState } from "../recoil/Atom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const Signin = () => {
    const [isAnonymous, setIsAnonymous] = useRecoilState(isAnonymousState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        client.get("/typinggame/user")
        .then(function(res){
            setIsAnonymous(false);
        })
        .catch(function(error){
            setIsAnonymous(true);
        });
    }, []);
    function submitSignin(e: any) {
        e.preventDefault();
        client.post(
            "/typinggame/login",
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