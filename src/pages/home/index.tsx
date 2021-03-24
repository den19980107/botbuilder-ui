import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useUserBots } from '../../api/user';
import BotList from '../../components/BotList';


interface IndexProps {

}

const Index: React.FC<IndexProps> = ({ }) => {
    const { data, isLoading, error } = useUserBots()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error?.message}</div>
    }

    if (data) {
        return (
            <div>
                <BotList bots={data}></BotList>
            </div>
        );
    }

    return <div>no bots</div>
}

export default Index;