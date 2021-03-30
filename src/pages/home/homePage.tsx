import { Button } from 'antd'
import React from 'react'
import { useUserBots } from '../../api/user'
import { BotList } from '../../components/BotList'
import history from '../../history'

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
                <Button onClick={() => history.push("/bot/create")}>建立</Button>
                <BotList bots={data}></BotList>
            </div>
        );
    }

    return <div>no bots</div>
}