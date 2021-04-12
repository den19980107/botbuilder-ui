import axios from "axios";
import { message } from 'antd';
import clientConfig from '../config/client.json'
import history from "../history";
import { secureStroge } from './storage';
import decode from 'jwt-decode';
import User from "../types/user";
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
            if (response.data.token) {
                secureStroge.set("token", response.data.token);
                history.push("/")
            }
        })
        .catch((err) => {
            console.log(err)
            message.error(err)
        })
};

const logout = () => {
    secureStroge.remove("token");
    history.push("/login")
};

const getCurrentUser = (): User => {
    const token = secureStroge.get("token");
    const user = decode<JWT_TOKEN>(token);
    return user
};

const getToken = (): string => {
    return secureStroge.get("token");
}

interface JWT_TOKEN {
    id: string,
    name: string;
    exp: number;
}

const checkAuth = () => {
    const token = secureStroge.get("token");
    if (!token) {
        console.error("no token!")
        return false;
    }

    try {
        const { exp } = decode<JWT_TOKEN>(token);
        if (exp < new Date().getTime()) {
            console.error("token expire!")
            return false
        }
    } catch (e) {
        console.error(e)
        return false
    }

    return true
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getToken,
    checkAuth
};