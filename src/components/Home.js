import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
	key: index + 1,
	label: `UI ${index + 1}`,
}));

const Home = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['1']}
					items={items}
					style={{ flex: 1, minWidth: 0 }}
				/>
			</Header>
			<Content style={{ padding: '0 48px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>UI</Breadcrumb.Item>
					<Breadcrumb.Item>UI 1</Breadcrumb.Item>
				</Breadcrumb>
				<div
					style={{
						background: colorBgContainer,
						minHeight: 280,
						padding: 24,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	);
};

export default Home;
