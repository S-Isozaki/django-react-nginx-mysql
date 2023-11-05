import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

const Signin = () => {
    const [currentUser, setCurrentUser] = useState<boolean>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        client.get("/typinggame/user")
        .then(function(res){
            setCurrentUser(true);
        })
        .catch(function(error){
            setCurrentUser(false);
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
            setCurrentUser(true);
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