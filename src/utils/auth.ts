import axios from "axios";
import { message } from 'antd';
import clientConfig from '../config/client.json'
import history from "../history";
import { secureStroge } from './storage';
const API_URL = `${clientConfig.API_URL}/auth/`;

const register = (username, password) => {
    axios.post(API_URL + "register", {
        username,
        password
    }).then((data) => {
        history.push("/login")
    }).catch((err) => {
        message.error(err.response.data.msg)
    })

};

const login = (username, password) => {
    axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                secureStroge.set("user", JSON.stringify(response.data));
                history.push("/")
            }
        })
        .catch((err) => {
            console.log(err.response)
            message.error(err.response.data.msg)
        })
};

const logout = () => {
    secureStroge.remove("user");
    history.push("/login")
};

const getCurrentUser = () => {
    return JSON.parse(secureStroge.get("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};