import React, { useContext, useEffect } from "react";
import { Material, Layout, MathOps, Export } from "./../components/docks";
import { ThemeContext } from "../context/themeSwitcher";

const Sidebar = ({plotRef}) => {
	useEffect(() => console.log("Renderowanie komponentu sidebar"));
	const theme = useContext(ThemeContext);
	const darkMode = theme.state.darkMode;
	return (
		<div
			className={`sidebar ${darkMode ? "sidebar-dark" : "sidebar-light"}`}
		>
			<div className="plot-settings">
				<div className="settings-element">
					<h4>Material</h4>
					<Material plotRef={plotRef}/>
				</div>
				<div className="settings-element">
					<h4>Math</h4>
					<MathOps />
				</div>
				<div className="settings-element">
					<h4>Layout</h4>
					<Layout />
				</div>
				<div className="settings-element">
					<h4>Export</h4>
					<Export />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;