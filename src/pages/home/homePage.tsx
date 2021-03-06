import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useUserScripts } from '../../api/user'
import { BotList } from '../../components/BotList'
import history from '../../history'

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = ({ }) => {
    const { data, isLoading, error } = useUserScripts()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error?.message}</div>
    }

    if (data) {
        return (
            <div style={{ padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <h1>腳本清單</h1>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => history.push("/bot/create")}>建立</Button>
                </div>
                <BotList bots={data}></BotList>
            </div>
        );
    }

    return <div>no bots</div>
}