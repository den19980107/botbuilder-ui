import axios from 'axios';
import React, { useEffect, useState } from 'react'
import auth from '../../utils/auth'
import clientConfig from '../../config/client.json'
import User from '../../types/user';
const API_URL = `${clientConfig.API_URL}`;

interface IndexProps {

}

const Index: React.FC<IndexProps> = ({ }) => {
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const user = auth.getCurrentUser();
        setUser(user)
    }, [])
    return (
        <div>welcome {user?.name}</div>
    );
}

export default Index;