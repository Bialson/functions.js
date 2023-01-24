import { useState, useContext, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/themeSwitcher";
import icon from "./../img/icons/logo256.png";

const Navbar = () => {
	const theme = useContext(ThemeContext);
	const darkMode = theme.state.darkMode;
	const modebar = document.querySelector(".js-plotly-plot .plotly .modebar");
	const modebarButton = document.querySelectorAll(
		".modebar .modebar-btn .icon"
	);
	const [showSettings, setSettingsDisplay] = useState(false);
	const [isSettingsHover, setSettingsHover] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
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
	const toggleFullScreen = () => {
		if (fullscreen) {
			document.exitFullscreen();
			setFullscreen(false);
		} else {
			setFullscreen(true);
			document.body.requestFullscreen();
		}
	};
	useEffect(() => console.log("Renderowanie komponentu navbar"));
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
			</p>
			<hr
				style={{
					borderColor: darkMode
						? "rgba(255, 255, 255, 0.08)"
						: "#000",
				}}
			/>
			<div className="navbar-item">
				<a
					href="https://bialson.github.io/Functions.JS/"
					className={`${
						darkMode ? "navbar-item-a-dark" : "navbar-item-a-light"
					}`}
				>
					<i className="bi bi-house-fill"></i>
					<span>Home</span>
				</a>
			</div>
			<div className="navbar-item">
				<a
					href="https://github.com/Bialson/Functions.JS#usage"
					className={`${
						darkMode ? "navbar-item-a-dark" : "navbar-item-a-light"
					}`}
				>
					<i className="bi bi-files"></i>
					<span>Docs</span>
				</a>
			</div>
			<div className="navbar-item">
				<a
					href="https://github.com/Bialson/Functions.JS#general-information"
					className={`${
						darkMode ? "navbar-item-a-dark" : "navbar-item-a-light"
					}`}
				>
					<i className="bi bi-info-circle-fill"></i>
					<span>About</span>
				</a>
			</div>
			<motion.div
				className="settings-button"
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
						color: isSettingsHover
							? "#60CDFF"
							: darkMode
							? "#fff"
							: "#000",
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
					Fullscreen
					<input
						type="checkbox"
						className={`checkbox-settings ${
							darkMode
								? "checkbox-settings-dark"
								: "checkbox-settings-light"
						}`}
						checked={fullscreen ? true : false}
						onChange={toggleFullScreen}
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

export default memo(Navbar);
