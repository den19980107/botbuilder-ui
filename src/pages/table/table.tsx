import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useColsDataByTableId, useCreateColumn, useCreateTableData, useDeleteColumn, useDeleteTableData, useTableDataByTableId } from '../../api/database';
import { Button, Form, Input, message, Modal, Select, Switch, Table as AntdTable } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import queryKeys from '../../api/queryKeys';
import { useQueryClient } from 'react-query';
import ColumnDataType from '../../constant/columnDataType.constants';
import Column from '../../types/column';

interface TableProps {

}

export const Table: React.FC<TableProps> = ({ }) => {
    const { id } = useParams<{ id: string }>();
    const { data: colData, error: colError, isLoading: colIsLoading } = useColsDataByTableId(id);
    const { data: tableData, error: tableError, isLoading: tableIsLoading } = useTableDataByTableId(id);
    const [isCreateColumnModalVisable, setIsCreateColumnModalVisable] = useState(false);
    const [isCreateTableDataModalVisable, setIsCreateTableDataModalVisable] = useState(false);

    useEffect(() => {
        console.log("colData change")
    }, [colData])

    const queryClient = useQueryClient();
    const deleteColumnMutation = useDeleteColumn({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.table.COLUMNS)
            message.success("刪除成功！")
        }
    })

    const createColumnMutation = useCreateColumn({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.table.COLUMNS)
            message.success("新增成功！")
        }
    })

    const createTableDataMutation = useCreateTableData({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.table.VALUE)
            message.success("新增成功！")
        }
    })

    const deleteTableDataMutation = useDeleteTableData({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.table.VALUE)
            message.success("刪除成功！")
        }
    })

    const showCreateColumnModal = () => {
        setIsCreateColumnModalVisable(true)
    }

    const showCreateTableDataModal = () => {
        setIsCreateTableDataModalVisable(true);
    }

    const onCreateColumnSubmit = (value) => {
        createColumnMutation({
            tableId: id,
            name: value.name,
            displayName: value.displayName,
            require: value.require,
            dataType: value.dataType
        })
        setIsCreateColumnModalVisable(false)
    }

    const onCreateTableDataSubmit = (value) => {
        createTableDataMutation({
            tableId: id,
            data: value
        })
        setIsCreateTableDataModalVisable(false)
    }

    if (colIsLoading || tableIsLoading) {
        return <div>loading...</div>
    }

    if (colError || tableError) {
        return <div>error</div>
    }

    if (colData && tableData) {
        const columns: Array<any> = [];
        for (const col of colData) {
            columns.push({
                title: <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{col.displayName}</span>
                    <Button
                        shape="circle"
                        danger icon={<MinusCircleOutlined />}
                        onClick={() => {
                            deleteColumnMutation({ columnId: col._id, tableId: id })
                        }}
                    ></Button>
                </div>,
                dataIndex: col.name,
                key: col.name
            })
        }
        columns.push({
            key: 'action',
            render: (text, record) => (
                <a onClick={() => deleteTableDataMutation({ tableId: id, rowId: record.rowId })}>刪除</a>
            ),
        })
        return (
            <>
                <div style={{ marginBottom: "1rem", padding: "0.5rem", background: "#eee" }}>
                    <Button style={{ marginRight: "1rem" }} type="primary" icon={<PlusOutlined />} onClick={showCreateColumnModal}>
                        新欄位
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showCreateTableDataModal}>
                        新增資料
                    </Button>
                </div>
                <CreateColumnModal
                    isCreateColumnModalVisable={isCreateColumnModalVisable}
                    setIsCreateColumnModalVisable={setIsCreateColumnModalVisable}
                    onCreateColumnSubmit={onCreateColumnSubmit}
                ></CreateColumnModal>
                <CreateTableDataModal
                    isCreateTableDataModalVisable={isCreateTableDataModalVisable}
                    setIsCreateTableDataModalVisable={setIsCreateTableDataModalVisable}
                    onCreateTableDataSubmit={onCreateTableDataSubmit}
                    columns={colData}
                ></CreateTableDataModal>
                {columns.length !== 0 ?
                    <AntdTable columns={columns} dataSource={tableData}></AntdTable>
                    :
                    <div>no data</div>
                }
            </>
        );
    }

    return <div>no data</div>
}

const CreateColumnModal = ({ isCreateColumnModalVisable, setIsCreateColumnModalVisable, onCreateColumnSubmit }) => {
    return (
        <Modal
            title="新增欄位"
            visible={isCreateColumnModalVisable}
            footer={null}
            onCancel={() => { setIsCreateColumnModalVisable(false) }}
        >
            <Form
                onFinish={onCreateColumnSubmit}
            >
                <Form.Item
                    label="表格名稱"
                    name="name"
                    rules={[{ required: true, message: 'Please input your column name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="顯示名稱"
                    name="displayName"
                    rules={[{ required: true, message: 'Please input your column display name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="是否必填"
                    name="require"
                    rules={[{ required: true, message: 'Please input your column is require!' }]}
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="資料格式"
                    name="dataType"
                    rules={[{ required: true, message: 'Please input your column data type!' }]}
                >
                    <Select>
                        {
                            Object.keys(ColumnDataType).map((key, idx) =>
                                <Select.Option key={idx} value={ColumnDataType[key]}>{ColumnDataType[key]}</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        送出
            </Button>
                </Form.Item>
            </Form>
        </Modal>

    )
}

interface CreateTableDataModalProp {
    isCreateTableDataModalVisable: boolean,
    setIsCreateTableDataModalVisable: any,
    onCreateTableDataSubmit: any,
    columns: Array<Column>
}

const CreateTableDataModal: React.FC<CreateTableDataModalProp> = ({ isCreateTableDataModalVisable, setIsCreateTableDataModalVisable, onCreateTableDataSubmit, columns }) => {
    console.log(columns)
    return (
        <Modal
            title="新增欄位"
            visible={isCreateTableDataModalVisable}
            footer={null}
            onCancel={() => { setIsCreateTableDataModalVisable(false) }}
        >
            <Form
                onFinish={onCreateTableDataSubmit}
            >
                {columns.map((col, idx) =>

                    <Form.Item
                        key={idx}
                        label={col.displayName}
                        name={col.name}
                        rules={[{ required: col.require, message: 'Please input your column name!' }]}
                    >
                        <Input />
                    </Form.Item>
                )}

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        送出
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}