import React, { useMemo, useState, useEffect } from "react";
import Styles from "./AttendanceMonitor.module.css";
import SearchBar from "./components/SearchBar";
import AttendanceList from "./components/AttendanceList";
import AttendanceListSkeleton from "./components/AttendanceListSkeleton";
import { TEACHERS } from "../Dashboard/components/PendingRequestsCard/Teachers.js";

const AttendanceMonitor = () => {
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const teachers = Array.isArray(TEACHERS) ? TEACHERS : [];

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return teachers;
		return teachers.filter((t) => {
			const name = String(t?.name ?? "").toLowerCase();
			const id = String(t?.id ?? "").toLowerCase();
			return name.includes(q) || id.includes(q);
		});
	}, [query, teachers]);

	return (
		<div className={Styles["attendance-monitor_container"]}>
			<SearchBar
				value={query}
				onChange={setQuery}
				placeholder="Buscar profesor..."
			/>

			{isLoading ? (
				<AttendanceListSkeleton />
			) : (
				<AttendanceList teachers={filtered} />
			)}
		</div>
	);
};

export default AttendanceMonitor;
