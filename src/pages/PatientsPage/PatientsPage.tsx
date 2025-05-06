import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { PatientDialog } from "../../components/PatientDialog/PatientDialog";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../types/types";
import { usePatientsData } from "../../hooks/usePatientsData";
import s from "./PatientsPage.module.scss";

export const PatientsPage: React.FC = () => {
	const toast = useRef<Toast>(null);
	const navigate = useNavigate();

	const [isAddEditDialogVisible, setIsAddEditDialogVisible] = useState(false);
	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
	const [filters, setFilters] = useState({
		name: { value: "", matchMode: FilterMatchMode.CONTAINS },
	});

	const onNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setFilters({
			...filters,
			name: {
				value,
				matchMode: FilterMatchMode.CONTAINS,
			},
		});
	};

	const renderHeader = () => {
		return (
			<div className={s.renderHeader}>
				<Button
					label="Add New Patient"
					icon="pi pi-plus"
					onClick={openAddDialog}
					className="p-button-success"
				/>
				<InputText
					value={filters.name?.value}
					onChange={onNameFilterChange}
					placeholder="Search by Name"
				/>
			</div>
		);
	};

	const openAddDialog = () => {
		setEditingPatient({ id: "", name: "", age: 0, primaryCondition: "" });
		setIsAddEditDialogVisible(true);
	};

	const openEditDialog = (patient: Patient) => {
		setEditingPatient({ ...patient });
		setIsAddEditDialogVisible(true);
	};

	const hideDialog = () => {
		setIsAddEditDialogVisible(false);
		setEditingPatient(null);
	};

	const {
		patients,
		isLoading,
		isFetching,
		isError,
		error,
		addPatient: mutateAddPatient,
		updatePatient: mutateUpdatePatient,
		deletePatient: mutateDeletePatient,
	} = usePatientsData({ toast, onDialogHide: hideDialog });

	const savePatient = (patientData: Patient) => {
		if (patientData.id) {
			mutateUpdatePatient(patientData);
		} else {
			mutateAddPatient(patientData);
		}
	};

	const handleRowClick = (event: DataTableRowClickEvent) => {
		navigate(`${event.data?.id}`);
	};

	return (
		<div className={s.container}>
			<Toast ref={toast} position="top-center" />
			{isLoading || isFetching ? (
				<ProgressSpinner />
			) : isError ? (
				<div>Error loading patients: {error?.message}</div>
			) : patients ? (
				<DataTable
					value={patients}
					filters={filters}
					header={renderHeader}
					emptyMessage="No patients found."
					onRowClick={handleRowClick}
					selectionMode="single"
				>
					<Column field="name" header="Name" style={{ width: "360px" }} />
					<Column field="age" header="Age" style={{ width: "200px" }} />
					<Column field="primaryCondition" header="Condition" />
					<Column
						header="Actions"
						style={{ width: "160px" }}
						align="center"
						body={(rowData: Patient) => (
							<div className={s.actionsCell}>
								<Button
									icon="pi pi-pencil"
									className="p-button-rounded p-button-sm"
									onClick={() => openEditDialog(rowData)}
								/>
								<Button
									icon="pi pi-trash"
									className="p-button-rounded p-button-danger p-button-sm"
									onClick={() => mutateDeletePatient(rowData.id)}
								/>
							</div>
						)}
					/>
				</DataTable>
			) : null}
			<PatientDialog
				visible={isAddEditDialogVisible}
				patient={editingPatient || { id: "", name: "", age: 0, primaryCondition: "" }}
				onHide={hideDialog}
				onSave={savePatient}
			/>
		</div>
	);
};
