import NavBar from "../../shared/components/NavBar";

export default function Layout({ children }) {
	return (
		<div
			style={{
				display: "flex",
				width: "100vw",
				overflow: "hidden",
				height: "100vh",
			}}
		>
			<NavBar />
			<main style={{ display: "flex", flexGrow: 1 }}>{children}</main>
		</div>
	);
}
