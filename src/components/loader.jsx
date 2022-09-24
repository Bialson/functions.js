import React from "react";
import "../css/Loader.css";
import icon from "../img/icons/logo256.png";

const Loader = () => {
	return (
		<div className="root">
			<img src={icon} alt="logo" width={250} height={127}/>
			<div className="loader" />
			Loading...
		</div>
	);
};

export default Loader;