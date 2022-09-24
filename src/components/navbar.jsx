import React, { useState, useContext } from "react";
import icon from "./../img/icons/logo256.png";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/themeSwitcher";

const Navbar = () => {
	const theme = useContext(ThemeContext);
	const darkMode = theme.state.darkMode;
	const modebar = document.querySelector(".js-plotly-plot .plotly .modebar");
	const modebarButton = document.querySelectorAll(".modebar .modebar-btn .icon");
	const switchTheme = () => {
		if (darkMode) {
			theme.dispatch({ type: "LIGHTMODE" });
			modebar.style.backgroundColor = "rgba(255,255,255,0.9)";
			modebarButton.forEach((button) => {
				button.querySelector("path").style.fill = "rgba(0, 0, 0, 0.7)";
			});
		} else {
			modebar.style.backgroundColor = "rgba(18, 19, 22, 0.8)";
			modebarButton.forEach((button) => {
				button.querySelector("path").style.fill =
					"rgba(255, 255, 255, 0.7)";
			});
			theme.dispatch({ type: "DARKMODE" });
		}
	};
	const [showSettings, setSettingsDisplay] = useState(false);
	const [isSettingsHover, setSettingsHover] = useState(false);
	return (
		<nav className={`navbar ${darkMode ? "navbar-dark" : "navbar-light"}`}>
			<p className="logoNav">
				<img
					src={icon}
					alt="icon"
					width={200}
					height={110}
					style={{ border: "none" }}
				/>
				&nbsp;<br></br>Functions.JS
			</p><hr style={{borderColor: darkMode ? "rgba(255, 255, 255, 0.08)" : "#000"}}/>
			{/* <div className='template_functions'>
            <ExampleFormula formula="\cfrac{a}{b} =" tex=" \cfrac{a}{b}"/>
            <ExampleFormula formula="\cfrac{a}{\cfrac{1}{b}} =" tex=" \cfrac{a}{1 + \cfrac{1}{b}}"/>
            <ExampleFormula formula="x^n =" tex=" x^n"/>
            <ExampleFormula formula="e^{x + y} =" tex=" e^{x + y}"/>
            <ExampleFormula formula="\sqrt{x} =" tex=" \sqrt{x}"/>
            <ExampleFormula formula="\sqrt[3]{x} =" tex=" \sqrt[3]{x}"/>
            <ExampleFormula formula="\int{f(x)dx} =" tex=" \int{f(x)dx"/>
          </div> */}
			<motion.div className="settings-button"
				onClick={() => {
					setSettingsDisplay((current) => !current);
				}}
				onMouseEnter={() => setSettingsHover(true)}
				onMouseLeave={() => setSettingsHover(false)}
			>
				<motion.i
					className="bi bi-gear-wide-connected"
					transition={{ duration: 0.8 }}
					animate={{
						rotateZ: isSettingsHover ? "360deg" : "0deg",
						color: isSettingsHover ? "#60CDFF" : (darkMode ? "#fff" : "#000"),
					}}
				></motion.i>
				<span>Settings</span>
			</motion.div>
			<motion.div
				className="settings-box"
				animate={{ height: showSettings ? "auto" : "0" }}
				transition={{ duration: 0.8, type: "spring" }}
			>
				<p>
					Dark Mode
					<input
						type="checkbox"
						className={`checkbox-settings ${
							darkMode
								? "checkbox-settings-dark"
								: "checkbox-settings-light"
						}`}
						defaultChecked={true}
						onChange={switchTheme}
					/>
				</p>
				<p>
					<img
						src="https://img.shields.io/npm/v/react?label=React&logo=react"
						alt="Badge"
					/>
				</p>
				<p>v.1.0_stable</p>
			</motion.div>
		</nav>
	);
};

export default Navbar;