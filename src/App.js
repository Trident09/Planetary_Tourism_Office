import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Destination from "./pages/Destination";
import Explore from "./pages/Explore";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route
					index
					element={<HomePage />}
				/>
				<Route
					path="/explore"
					element={<Explore />}
				/>
				<Route
					path="/destination"
					element={<Destination />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
