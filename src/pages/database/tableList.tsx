import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useAllTableData } from '../../api/database';
import history from '../../history';
import TableType from '../../types/table';

interface TableListProps {
    table: Array<TableType>
}

export const TableList: React.FC<TableListProps> = ({ table }) => {

    const columns = [
        {
            title: '名稱',
            dataIndex: 'name',
            key: 'name',
        }
    ];
    return (
        <Table dataSource={table} onRow={(record: any, rowIndx) => {
            return {
                onClick: (event) => {
                    history.push(`/database/table/${record._id}`)
                }
            }
        }} columns={columns} />
    )

}