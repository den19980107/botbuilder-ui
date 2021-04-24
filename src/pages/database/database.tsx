import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Form, message } from 'antd';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useCreateTable, useAllTableData } from '../../api/database';
import queryKeys from '../../api/queryKeys';
import { TableList } from './tableList';
interface DatabaseProps {

}

export const Database: React.FC<DatabaseProps> = ({ }) => {
    const { data, error, isLoading } = useAllTableData();
    const [isCreateTableModalVisable, setIsCreateTableModalVisable] = useState(false);
    const queryClient = useQueryClient();
    const createTableMutation = useCreateTable({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.table.TABLE);
            message.success("新增成功！")
            setIsCreateTableModalVisable(false);
        }
    })
    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error?.message}</div>
    }

    const showCreateTableModal = () => {
        setIsCreateTableModalVisable(true);
    }

    const onCreateTableSubmit = (value) => {
        createTableMutation({ name: value.name })
    }

    if (data) {
        return (
            <div>
                <div>
                    <div style={{ marginBottom: "1rem", padding: "0.5rem", background: "#eee" }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showCreateTableModal}>
                            新表格
                        </Button>
                    </div>
                    <Modal
                        title="新增表格"
                        visible={isCreateTableModalVisable}
                        footer={null}
                        onCancel={() => { setIsCreateTableModalVisable(false) }}
                    >
                        <Form
                            onFinish={onCreateTableSubmit}
                        >
                            <Form.Item
                                label="表格名稱"
                                name="name"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    送出
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <TableList table={data}></TableList>
                </div>
            </div>
        );
    }

    return <div>no data</div>
}