import React from 'react';
import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = new Array(10).fill(null).map((_, index) => ({
	key: index + 1,
	label: `UI ${index + 1}`,
	path: `/ui_${index + 1}`,
}));

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathSnippets = location.pathname.split('/').filter((i) => i);
	const breadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		const matchingItem = items.find((item) => item.path === url);
		return (
			<Breadcrumb.Item key={url}>
				{matchingItem ? <Link to={url}>{matchingItem.label}</Link> : url}
			</Breadcrumb.Item>
		);
	});

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const handleMenuClick = ({ key }) => {
		const item = items.find((item) => item.key.toString() === key);
		if (item) {
			navigate(item.path);
		}
	};

	return (
		<Layout>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
					position: 'sticky',
					zIndex: 1,
					width: '100%',
					top: 0,
				}}
			>
				<div className="demo-logo" style={{ color: 'white' }}>
					logo
				</div>
			</Header>
			<Layout>
				<Sider
					width={200}
					style={{
						background: colorBgContainer,
					}}
				>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{
							height: '100%',
							borderRight: 0,
						}}
						items={items}
						onClick={handleMenuClick}
					/>
				</Sider>
				<Layout
					style={{
						padding: '0 24px 24px',
					}}
				>
					<Breadcrumb
						style={{
							margin: '16px 0',
						}}
					>
						<Breadcrumb.Item>
							<Link to="/">Home</Link>
						</Breadcrumb.Item>
						{breadcrumbItems}
					</Breadcrumb>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</Content>
					<Footer
						style={{
							textAlign: 'center',
						}}
					>
						Ant Design ©{new Date().getFullYear()} Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default Home;
