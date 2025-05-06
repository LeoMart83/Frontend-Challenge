import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PatientsPage } from "./pages/PatientsPage/PatientsPage";
import { PatientDetailsPage } from "./pages/PatienDetailsPage/PatientDetailsPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/patients" replace />} />
					<Route path="/patients" element={<PatientsPage />} />
					<Route path="/patients/:id" element={<PatientDetailsPage />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
