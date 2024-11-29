import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ConnectionStatus from "./ConnectionStatus";

const BasicLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<ConnectionStatus />
		</>
	);
};

export default BasicLayout;
