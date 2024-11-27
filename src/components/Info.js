import React, { useState } from 'react';
import { Col, Row, Button, Form, Input, InputNumber, Modal, Checkbox, message, Space } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Info = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [settingsData, setSettingsData] = useState({
		headless: false,
		username: '',
		doNotDuplicateSend: false,
		doNotSend: false,
		directURL: false,
		doNotSelectCheckbox: false,
		doNotSelectRadio: false,
		doNotSelectPulldown: false,
		parallelProcess: '',
		stoptime: '',
		stopday: '',
		label1: false,
		label2: '',
	});

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	const showModal = () => setIsModalOpen(true);
	const handleCancel = () => setIsModalOpen(false);
	const handleOk = () => {
		console.log('Modal settings saved:', settingsData);
		setIsModalOpen(false);
	};

	const handleCheckboxChange = (key, value) => {
		setSettingsData((prev) => ({
			...prev,
			[key]: value.target ? value.target.checked : value,
		}));
	};

	const handleSendAPI = async () => {
		try {
			// Validate form fields
			const sendData = await form.validateFields();
			const linkUrls = await form2.validateFields();
			const listUrl = linkUrls.linkUrls.trim().split('\n');
			const dataToSend = {
				data: {
					setting: {
						...settingsData,
					},
					data_send: {
						...sendData,
					},
					list_urls: listUrl,
				},
			};

			console.log('Sending data:', dataToSend);

			// Simulate API call
			const response = await axios.post('http://localhost:8080/info', dataToSend, {
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.status == 200) {
				message.success('Data sent successfully!');
			} else {
				message.error('Failed to send data.');
			}
		} catch (error) {
			message.error('Please check the form inputs!');
			console.error(error);
		}
	};

	return (
		<>
			<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Col className="gutter-row" span={9}>
					<Form form={form2} labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} layout="vertical">
						<Form.Item
							name="linkUrls"
							label="Link URLs"
							rules={[{ required: true, message: 'Vui lòng nhập link URL!' }]}
						>
							<TextArea rows={38} />
						</Form.Item>
					</Form>
				</Col>
				<Col className="gutter-row" span={15}>
					<Form
						form={form}
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						layout="horizontal"
						labelAlign="left"
						labelWrap="true"
					>
						<Form.Item
							name="companyName"
							label="Tên công ty"
							rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="departmentName"
							label="Tên bộ phận"
							rules={[{ required: true, message: 'Vui lòng nhập tên bộ phận!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="managerName"
							label="Tên người đảm nhiệm"
							rules={[{ required: true, message: 'Vui lòng nhập người đảm nhiệm!' }]}
						>
							<Space.Compact
								style={{
									width: '100%',
								}}
							>
								<Input
									style={{
										width: '50%',
									}}
									placeholder="Họ"
								/>
								<Input
									style={{
										width: '50%',
									}}
									placeholder="Tên"
								/>
							</Space.Compact>
						</Form.Item>
						<Form.Item
							name="katakanaName"
							label="Tên katakana"
							rules={[{ required: true, message: 'Vui lòng nhập tên katakana!' }]}
						>
							<Space.Compact
								style={{
									width: '100%',
								}}
							>
								<Input
									style={{
										width: '50%',
									}}
									placeholder="Họ"
								/>
								<Input
									style={{
										width: '50%',
									}}
									placeholder="Tên"
								/>
							</Space.Compact>
						</Form.Item>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ type: 'email', message: 'Email không hợp lệ!' },
								{ required: true, message: 'Vui lòng nhập email!' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="companyUrl"
							label="URL công ty"
							rules={[{ required: true, message: 'Vui lòng nhập URL công ty!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="numberOfEmployees"
							label="Số lượng người"
							rules={[{ required: true, message: 'Vui lòng nhập số lượng người!' }]}
						>
							<InputNumber style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item
							name="phoneNumber"
							label="SĐT"
							rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
						>
							<Space
								style={{
									display: 'flex',
								}}
							>
								<Input /> -
								<Input /> -
								<Input />
							</Space>
						</Form.Item>
						<Form.Item
							name="fax"
							label="Fax"
							rules={[{ required: true, message: 'Vui lòng nhập số fax!' }]}
						>
							<Space
								style={{
									display: 'flex',
								}}
							>
								<Input /> -
								<Input /> -
								<Input />
							</Space>
						</Form.Item>
						<Form.Item
							name="zipcode"
							label="Zipcode"
							rules={[{ required: true, message: 'Vui lòng nhập zipcode!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="province"
							label="Tỉnh"
							rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="city"
							label="Thành phố, thị trấn"
							rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="address"
							label="Số nhà, toà"
							rules={[{ required: true, message: 'Vui lòng nhập số nhà!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="issueTitle"
							label="Tiêu đề vấn đề hỏi"
							rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="issueContent"
							label="Nội dung hỏi"
							rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
						>
							<TextArea rows={4} />
						</Form.Item>
					</Form>
				</Col>
			</Row>
			<Row
				// gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Button onClick={showModal} style={{ 'min-width': '120px' }}>
					Settings
				</Button>
				<Button style={{ 'min-width': '120px' }}>Help</Button>
				<Button style={{ 'min-width': '120px' }}>Save</Button>
				<Button type="primary" style={{ 'min-width': '120px' }} onClick={handleSendAPI}>
					Send API
				</Button>
			</Row>
			<Modal
				title="Settings"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={'80%'}
			>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					layout="horizontal"
					labelAlign="left"
				>
					<Form.Item label="headless">
						<Checkbox
							checked={settingsData.headless}
							onChange={(e) => handleCheckboxChange('headless', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="username">
						<Input
							value={settingsData.username}
							onChange={(e) => handleCheckboxChange('username', e.target.value)}
							style={{ 'max-width': '200px' }}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DoNotDuplicateSend">
						<Checkbox
							checked={settingsData.doNotDuplicateSend}
							onChange={(e) => handleCheckboxChange('doNotDuplicateSend', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DoNotSend">
						<Checkbox
							checked={settingsData.doNotSend}
							onChange={(e) => handleCheckboxChange('doNotSend', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DirectURL">
						<Checkbox
							checked={settingsData.directURL}
							onChange={(e) => handleCheckboxChange('directURL', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DoNotSelectCheckbox">
						<Checkbox
							checked={settingsData.doNotSelectCheckbox}
							onChange={(e) => handleCheckboxChange('doNotSelectCheckbox', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DoNotSelectRadio">
						<Checkbox
							checked={settingsData.doNotSelectRadio}
							onChange={(e) => handleCheckboxChange('doNotSelectRadio', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="DoNotSelectPulldown">
						<Checkbox
							checked={settingsData.doNotSelectPulldown}
							onChange={(e) => handleCheckboxChange('doNotSelectPulldown', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="ParallelProcess">
						<Input
							value={settingsData.parallelProcess}
							onChange={(e) => handleCheckboxChange('parallelProcess', e.target.value)}
							style={{ 'max-width': '200px' }}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="stoptime">
						<Input
							value={settingsData.stoptime}
							onChange={(e) => handleCheckboxChange('stoptime', e.target.value)}
							style={{ 'max-width': '200px' }}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="stopday">
						<Input
							value={settingsData.stopday}
							onChange={(e) => handleCheckboxChange('stopday', e.target.value)}
							style={{ 'max-width': '200px' }}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="LABEL_TEXT">
						<Checkbox
							checked={settingsData.label1}
							onChange={(e) => handleCheckboxChange('label1', e)}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
					<Form.Item label="LABEL_TEXT">
						<Input
							value={settingsData.label2}
							onChange={(e) => handleCheckboxChange('label2', e.target.value)}
							style={{ 'max-width': '200px' }}
						/>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
						</span>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Info;
