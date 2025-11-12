import React, { useState, useEffect } from "react";
import Styles from "./ClockCard.module.css";

const formatDate = (date) => {
	return new Intl.DateTimeFormat("es-ES", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);
};

const formatTime = (date) => {
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function ClockCard() {
	const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
	const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			setCurrentTime(formatTime(now));
			setCurrentDate(formatDate(now));
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className={Styles["clock_card"]}>
			<h1 className={Styles["clock_time"]}>{currentTime}</h1>
			<p className={Styles["clock_date"]}>{currentDate}</p>
		</div>
	);
}
