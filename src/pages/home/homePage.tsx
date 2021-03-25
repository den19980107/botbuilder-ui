import React from 'react'
import { useUserBots } from '../../api/user'
import { BotList } from '../../components/BotList'

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = ({ }) => {
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