import { selector } from "recoil";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const setIsAnonymous = selector({
    key: 'setIsAnonymous',
    get: ({get}) => {
        axios.get('/typinggame/checkAuthenticationStatus').then(response => {return response.data.is_anonymous})
        return false;
    }
})
