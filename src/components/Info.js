import React, { useState } from 'react';
import {
	Col,
	Row,
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Checkbox,
	message,
	Space,
	Divider,
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Info = () => {
	const API_URL = 'http://localhost:8080/info';
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
	const [initialSettingsData, setInitialSettingsData] = useState({});

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	const showModal = () => {
		setInitialSettingsData(settingsData);
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setSettingsData(initialSettingsData);
		setIsModalOpen(false);
	};
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

	const validateDataSend = async () => {
		try {
			// Validate form fields
			const form2Data = await form2.validateFields();
			const managerName = `${form2Data.managerName.firstName} ${form2Data.managerName.lastName}`;
			const katakanaName = `${form2Data.katakanaName.firstName} ${form2Data.katakanaName.lastName}`;
			const phoneNumber = `${form2Data.phoneNumber.firstPart}-${form2Data.phoneNumber.secondPart}-${form2Data.phoneNumber.thirdPart}`;
			const fax = `${form2Data.fax.firstPart}-${form2Data.fax.secondPart}-${form2Data.fax.thirdPart}`;
			const zipcode = `${form2Data.zipcode.firstPart}-${form2Data.zipcode.secondPart}`;
			const sendData = {
				...form2Data,
				managerName: managerName,
				katakanaName: katakanaName,
				phoneNumber: phoneNumber,
				fax: fax,
				zipcode: zipcode,
			};
			return sendData;
		} catch (error) {
			message.error('Please check the form inputs!');
			console.error(error);
		}
	};

	const handleSaveInfo = async () => {
		try {
			const linkUrls = await form.validateFields();
			const sendData = await validateDataSend();
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
			console.log('Data:', dataToSend);
		} catch (error) {
			message.error('Please check the form inputs!');
			console.error(error);
		}
	};

	const handleSendAPI = async () => {
		try {
			// Validate form fields
			const linkUrls = await form.validateFields();
			const sendData = await validateDataSend();
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
			const response = await axios.post(API_URL, dataToSend, {
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.status === 200) {
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
					<Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} layout="vertical">
						<Form.Item
							name="linkUrls"
							label="Link URLs"
							rules={[{ required: true, message: 'Nhập ít nhất 1 URL!' }]}
						>
							<TextArea rows={38} />
						</Form.Item>
					</Form>
				</Col>
				<Col className="gutter-row" span={15}>
					<Form
						form={form2}
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
							<Input placeholder="Tên công ty" />
						</Form.Item>
						<Form.Item
							name="departmentName"
							label="Tên bộ phận"
							rules={[{ required: true, message: 'Vui lòng nhập tên bộ phận!' }]}
						>
							<Input placeholder="Tên bộ phận" />
						</Form.Item>
						<Form.Item label="Tên người đảm nhiệm" required>
							<Space.Compact
								style={{
									width: '100%',
								}}
								rules={[{ required: true, message: 'Vui lòng nhập người đảm nhiệm!' }]}
							>
								<Form.Item
									name={['managerName', 'firstName']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
								>
									<Input
										style={{
											width: '50%',
										}}
										placeholder="Họ"
									/>
								</Form.Item>
								<Form.Item
									name={['managerName', 'lastName']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
								>
									<Input
										style={{
											width: '50%',
										}}
										placeholder="Tên"
									/>
								</Form.Item>
							</Space.Compact>
						</Form.Item>
						<Form.Item label="Tên katakana" required>
							<Space.Compact
								style={{
									width: '100%',
								}}
							>
								<Form.Item
									name={['katakanaName', 'firstName']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
								>
									<Input
										style={{
											width: '50%',
										}}
										placeholder="Họ"
									/>
								</Form.Item>
								<Form.Item
									name={['katakanaName', 'lastName']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
								>
									<Input
										style={{
											width: '50%',
										}}
										placeholder="Tên"
									/>
								</Form.Item>
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
							<Input placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="companyUrl"
							label="URL công ty"
							rules={[{ required: true, message: 'Vui lòng nhập URL công ty!' }]}
						>
							<Input placeholder="URL công ty" />
						</Form.Item>
						<Form.Item
							name="numberOfEmployees"
							label="Số lượng người"
							rules={[{ required: true, message: 'Vui lòng nhập số lượng người!' }]}
						>
							<InputNumber style={{ width: '100%' }} placeholder="Số lượng người" />
						</Form.Item>
						<Form.Item label="SĐT" required>
							<Space
								style={{
									display: 'flex',
								}}
							>
								<Form.Item
									name={['phoneNumber', 'firstPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
								>
									<Input />
								</Form.Item>
								-
								<Form.Item
									name={['phoneNumber', 'secondPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
								>
									<Input />
								</Form.Item>
								-
								<Form.Item
									name={['phoneNumber', 'thirdPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
								>
									<Input />
								</Form.Item>
							</Space>
						</Form.Item>
						<Form.Item label="Fax" required>
							<Space
								style={{
									display: 'flex',
								}}
							>
								<Form.Item
									name={['fax', 'firstPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập số fax!' }]}
								>
									<Input />
								</Form.Item>
								-
								<Form.Item
									name={['fax', 'secondPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập số fax!' }]}
								>
									<Input />
								</Form.Item>
								-
								<Form.Item
									name={['fax', 'thirdPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập số fax!' }]}
								>
									<Input />
								</Form.Item>
							</Space>
						</Form.Item>
						<Form.Item label="Zipcode" required>
							<Space.Compact
								style={{
									display: 'flex',
									width: '100%',
									gap: '8px',
								}}
							>
								<Form.Item
									name={['zipcode', 'firstPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập zipcode!' }]}
									style={{ flex: 1 }}
								>
									<Input />
								</Form.Item>
								<span style={{ display: 'flex', alignItems: 'center' }}>-</span>
								<Form.Item
									name={['zipcode', 'secondPart']}
									noStyle
									rules={[{ required: true, message: 'Vui lòng nhập zipcode!' }]}
									style={{ flex: 1 }}
								>
									<Input />
								</Form.Item>
							</Space.Compact>
						</Form.Item>
						<Form.Item
							name="province"
							label="Tỉnh"
							rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
						>
							<Input placeholder="Tỉnh" />
						</Form.Item>
						<Form.Item
							name="city"
							label="Thành phố, thị trấn"
							rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
						>
							<Input placeholder="Thành phố, thị trấn" />
						</Form.Item>
						<Form.Item
							name="address"
							label="Số nhà, toà"
							rules={[{ required: true, message: 'Vui lòng nhập số nhà!' }]}
						>
							<Input placeholder="Số nhà, toà" />
						</Form.Item>
						<Form.Item
							name="issueTitle"
							label="Tiêu đề vấn đề hỏi"
							rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
						>
							<Input placeholder="Tiêu đề vấn đề hỏi" />
						</Form.Item>
						<Form.Item
							name="issueContent"
							label="Nội dung hỏi"
							rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
						>
							<TextArea rows={4} placeholder="Nội dung hỏi" />
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
				<Button style={{ 'min-width': '120px' }} onClick={handleSaveInfo}>
					Save
				</Button>
				<Button type="primary" style={{ 'min-width': '120px' }} onClick={handleSendAPI}>
					Send API
				</Button>
			</Row>

			{/* Modal */}
			<Modal
				title="Settings"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={'80%'}
				footer={[
					<Button key="back" onClick={handleCancel} style={{ 'min-width': '120px' }}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk} style={{ 'min-width': '120px' }}>
						Submit
					</Button>,
				]}
			>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					layout="horizontal"
					labelAlign="left"
				>
					<Divider />
					<Form.Item label="headless">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.headless}
									onChange={(e) => handleCheckboxChange('headless', e)}
								/>
							</Col>
							<Col span={18}>
								<span className="col-">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="username">
						<Row>
							<Col span={6}>
								<Input
									value={settingsData.username}
									onChange={(e) => handleCheckboxChange('username', e.target.value)}
									style={{ 'max-width': '200px' }}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DoNotDuplicateSend">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.doNotDuplicateSend}
									onChange={(e) => handleCheckboxChange('doNotDuplicateSend', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DoNotSend">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.doNotSend}
									onChange={(e) => handleCheckboxChange('doNotSend', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DirectURL">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.directURL}
									onChange={(e) => handleCheckboxChange('directURL', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DoNotSelectCheckbox">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.doNotSelectCheckbox}
									onChange={(e) => handleCheckboxChange('doNotSelectCheckbox', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DoNotSelectRadio">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.doNotSelectRadio}
									onChange={(e) => handleCheckboxChange('doNotSelectRadio', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="DoNotSelectPulldown">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.doNotSelectPulldown}
									onChange={(e) => handleCheckboxChange('doNotSelectPulldown', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="ParallelProcess">
						<Row>
							<Col span={6}>
								<Input
									value={settingsData.parallelProcess}
									onChange={(e) => handleCheckboxChange('parallelProcess', e.target.value)}
									style={{ 'max-width': '200px' }}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="stoptime">
						<Row>
							<Col span={6}>
								<Input
									value={settingsData.stoptime}
									onChange={(e) => handleCheckboxChange('stoptime', e.target.value)}
									style={{ 'max-width': '200px' }}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="stopday">
						<Row>
							<Col span={6}>
								<Input
									value={settingsData.stopday}
									onChange={(e) => handleCheckboxChange('stopday', e.target.value)}
									style={{ 'max-width': '200px' }}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="LABEL_TEXT">
						<Row>
							<Col span={6} style={{ textAlign: 'center' }}>
								<Checkbox
									checked={settingsData.label1}
									onChange={(e) => handleCheckboxChange('label1', e)}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="LABEL_TEXT">
						<Row>
							<Col span={6}>
								<Input
									value={settingsData.label2}
									onChange={(e) => handleCheckboxChange('label2', e.target.value)}
									style={{ 'max-width': '200px' }}
								/>
							</Col>
							<Col span={18}>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dui nulla,
								</span>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Info;
