import logo from './logo.svg';
import './App.css';
import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import NotFound from './components/NotFound';

function App() {
	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						fontFamily: 'Segoe UI',
					},
				}}
			>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/ui_1" element={<Info />}></Route>
					</Route>

					{/* Route 404 */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ConfigProvider>
		</>
	);
}

export default App;
