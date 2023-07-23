import "@styles/globals.scss";

export const metadata = {
	title: "Promptopia",
	description: "Discover & Share AI Prompts"
}

const RootLayout = () => {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />
					<main className="app">
						{children}
					</main>
				</div>
			</body>
		</html>
	)
}

export default RootLayout; 