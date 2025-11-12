import Styles from "./RequestHistory.module.css";
import { getRequestById } from "./Teachers";
import { useEffect, useState } from "react";
import EmptyBox from "../../../EmptyBox";

export default function RequestHistory({ id_teacher }) {
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		if (id_teacher) {
			const fetchRequests = async () => {
				const data = await getRequestById(id_teacher);
				setRequests(data.records);
			};
			fetchRequests();
		}
	}, [id_teacher]);

	return (
		<div className={Styles["request_history_container"]}>
			{requests.length > 0 ? (
				requests.map((request) => (
					<RequestsCard key={request.id} request={request} />
				))
			) : (
				<EmptyBox />
			)}
		</div>
	);
}

const RequestsCard = ({ request }) => {
	return (
		<div
			className={`${Styles["request_card"]} ${
				Styles[`request_event_${request.status}`]
			}`}
		>
			<p className={Styles["request_date"]}>{request.date}</p>
			<h3 className={Styles["request_title"]}>
				{request.status === 1 ? "Justificante" : "Permiso"}
			</h3>
		</div>
	);
};
