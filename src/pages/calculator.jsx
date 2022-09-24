import "./../css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import Navbar from "../components/navbar";
import Chart from "./../components/plot";
import Sidebar from "./../components/sidebar";
import { IsLoading } from "../context/loading";
import Loader from "../components/loader";

const Calculator = () => {
	const [loading, setLoading] = React.useState(true);
	const loadingState = React.useMemo(
		() => ({ loading, setLoading }),
		[loading]
	);
	return (
		<>
			{loading ? <Loader /> : null}
			<Navbar />
			<IsLoading.Provider value={loadingState}>
				<Chart />
			</IsLoading.Provider>
			<Sidebar />
		</>
	);
};

export default Calculator;
