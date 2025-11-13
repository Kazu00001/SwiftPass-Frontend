import React from "react";
import Styles from "./AttendanceListSkeleton.module.css";

const AttendanceListSkeleton = () => {
	const placeholders = Array.from({ length: 15 });

	return (
		<div className={Styles["attendance-list_container"]}>
			{placeholders.map((_, index) => (
				<TeacherListBox key={index} />
			))}
		</div>
	);
};

function TeacherListBox() {
	return (
		<button className={Styles["teacher-list-box_container"]}>
			<section className={Styles["teacher-photo_container"]}></section>
			<section className={Styles["teacher-name_container"]}></section>
		</button>
	);
}

export default AttendanceListSkeleton;
