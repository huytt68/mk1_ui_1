import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'antd';
import axios from 'axios';

const NotFound = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const API_URL = 'http://localhost:8080/info2';
	const API_URL2 = 'https://auto-contact-api.mk1technology.vn/api/get_histories?limit=10&page=1';
	const columns = [
		{
			title: 'ID',
			width: 50,
			dataIndex: 'id',
			key: 'id',
			fixed: 'left',
		},
		{
			title: 'Full Name',
			width: 100,
			dataIndex: 'fullname',
			key: 'name',
			fixed: 'left',
		},
		{
			title: 'Age',
			width: 100,
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Column 1',
			dataIndex: 'color',
			key: '1',
			width: 150,
		},
		{
			title: 'Column 2',
			dataIndex: 'uni',
			key: '2',
			width: 150,
		},
		{
			title: 'Column 3',
			dataIndex: 'address',
			key: '3',
			width: 150,
		},
		{
			title: 'Column 4',
			dataIndex: 'nationality',
			key: '4',
			width: 150,
		},
		{
			title: 'Column 5',
			dataIndex: 'region',
			key: '5',
			width: 150,
		},
		{
			title: 'Column 6',
			dataIndex: 'planet',
			key: '6',
			width: 150,
		},
		{
			title: 'Column 7',
			dataIndex: 'test',
			key: '7',
			width: 150,
		},
		{
			title: 'Action',
			key: 'action',
			fixed: 'right',
			width: 100,
		},
	];

	const fetchData = async () => {
		setLoading(true);
		try {
			// const response = await fetch(
			// 	'https://auto-contact-api.mk1technology.vn/api/get_histories?limit=10&page=1',
			// 	{
			// 		mode: 'no-cors',
			// 		method: 'get',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			apikey: 'd3wgYZRpZ2bqdrtrC7Wb9dTF9Vo8zWR0',
			// 		},
			// 	}
			// );
			// setData(response.data.data);
			// console.log(response);
		} catch (error) {
			console.log('Failed to load data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				loading={loading}
				pagination={{ pageSize: 5 }}
				scroll={{
					x: 1500,
				}}
			></Table>
			<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button style={{ 'min-width': '120px' }} onClick={fetchData}>
					Get data
				</Button>
				<Button type="primary" style={{ 'min-width': '120px' }}>
					Save
				</Button>
			</Row>
		</>
	);
};

export default NotFound;
