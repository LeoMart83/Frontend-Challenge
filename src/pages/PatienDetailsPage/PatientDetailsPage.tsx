import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../../api/patientsApi";
import { ProgressSpinner } from "primereact/progressspinner";
import { BreadCrumb } from "primereact/breadcrumb";
import { PatientNotes } from "../../components/PatientNotes/PatientNotes";
import { Patient } from "../../types/types";
import ava from "../../assets/ava.png";
import s from "./PatientDetailsPage.module.scss";
import { PATIENT_BY_ID_QUERY_KEY } from "../../constants/constants";

export const PatientDetailsPage: React.FC = () => {
	const { id: patientId } = useParams();

	const {
		data: patientData,
		isLoading,
		isFetching,
		isError,
		error,
	} = useQuery<Patient, Error>({
		queryKey: [PATIENT_BY_ID_QUERY_KEY, patientId],
		queryFn: ({ queryKey }) => fetchPatientById(queryKey[1] as string),
		enabled: !!patientId,
		retry: false,
	});

	const items = [{ label: "<- Patients", url: "/patients" }];

	return (
		<div className={s.container}>
			{isLoading || isFetching ? (
				<ProgressSpinner />
			) : isError ? (
				<div>Error loading patients: {error?.message}</div>
			) : patientData ? (
				<>
					<BreadCrumb model={items} className={s.breadcrumbs} color="red" />
					<div className={s.patientData}>
						<div className={s.patinentInfo}>
							<img src={ava} />
							<div>
								<h2>Patient Details</h2>
								<p>Name: {patientData.name}</p>
								<p>Age: {patientData.age}</p>
								<p>Condition: {patientData.primaryCondition}</p>
							</div>
						</div>

						<hr></hr>

						<div className={s.patientNotes}>
							<PatientNotes patientId={patientId} />
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};
