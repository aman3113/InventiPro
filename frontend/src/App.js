import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LayoutPage from "./pages/LayoutPage";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import SalesPage from "./pages/SalesPage";

function App() {
	return (
		<div className="">
			<ChakraProvider>
				<Provider store={Store}>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route path="/signup" element={<SignupPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/" element={<LayoutPage />}>
								<Route index element={<DashboardPage />} />
								<Route path="/inventory" element={<InventoryPage />} />
								<Route path="/sales" element={<SalesPage />} />
							</Route>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</BrowserRouter>
				</Provider>
				<Analytics />
			</ChakraProvider>
		</div>
	);
}

export default App;
