import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react'
import { useAllTableData, useColsDataByTableId } from '../../../../api/database';
import { InsertRowNodePayload } from 'botbuilder-share'
const { Option } = Select;

interface InsertRowFloatPannelLayoutProps {
    payload: InsertRowNodePayload,
    onChange: (payload: InsertRowNodePayload) => void,
    onDelete: () => void
}

export const InsertRowFloatPannelLayout: React.FC<InsertRowFloatPannelLayoutProps> = ({ payload, onChange, onDelete }) => {
    const { data, error, isLoading } = useAllTableData();
    const [selectedTableId, setSelectedTableId] = useState<string | null>(payload.tableId);
    console.log("payload = ", payload)
    if (error) return <div>error...</div>

    if (isLoading) return <div>loding</div>


    const handleSelectTable = (tableId) => {
        setSelectedTableId(tableId)
    }


    if (data) {
        return (
            <div>
                <h1>選擇資料表</h1>
                <Select style={{ width: 120 }} onChange={handleSelectTable} defaultValue={payload.tableId}>
                    {data.map((table, idx) =>
                        <Option key={idx} value={table._id}>{table.name}</Option>
                    )}
                </Select>
                {selectedTableId && <DatabaseInsertForm tableId={selectedTableId} payload={payload} onChange={onChange} onDelete={onDelete} ></DatabaseInsertForm>}
            </div>
        );
    }

    return <div>no data</div>
}


interface DatabaseInsertFormInput {
    tableId: string,
    payload: InsertRowNodePayload,
    onChange: (payload: InsertRowNodePayload) => void,
    onDelete: () => void
}

export const DatabaseInsertForm: React.FC<DatabaseInsertFormInput> = ({ payload, tableId, onChange, onDelete }) => {
    const { data, isError, isLoading } = useColsDataByTableId(tableId);

    if (isError) return <div>error</div>
    if (isLoading) return <div>loading ...</div>

    const onFinish = (formData) => {
        const payload: InsertRowNodePayload = {
            tableId,
            data: formData
        }
        onChange(payload)
    };

    if (data) {
        return (
            <div style={{ marginTop: "1rem" }}>
                <h1>請輸入欄位資料</h1>
                <Form
                    onFinish={onFinish}
                >
                    {data.map((col, index) => {
                        return (
                            <Form.Item
                                key={index}
                                label={col.displayName}
                                name={col.name}
                                rules={[{ required: col.require, message: 'Please input your username!' }]}
                                initialValue={payload.data && payload.data[col.name]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    })}


                    <Form.Item >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button danger onClick={onDelete}>刪除</Button>
                            <Button type="primary" htmlType="submit">
                                確定
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    return <div>no data</div>
}