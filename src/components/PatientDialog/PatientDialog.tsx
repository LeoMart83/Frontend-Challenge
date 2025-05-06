import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Patient } from "../../types/types";
import s from "./PatientDialog.module.scss";

interface PatientDialogProps {
	visible: boolean;
	patient: Patient;
	onHide: () => void;
	onSave: (patient: Patient) => void;
}

export const PatientDialog: React.FC<PatientDialogProps> = ({
	visible,
	patient,
	onHide,
	onSave,
}) => {
	const [patientData, setPatinetData] = useState<Patient>(patient);

	useEffect(() => {
		setPatinetData(patient);
	}, [patient]);

	const handleSave = () => {
		onSave(patientData);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent,
		field: keyof typeof patient
	) => {
		setPatinetData((prev) => ({
			...prev,
			[field]:
				(e as React.ChangeEvent<HTMLInputElement>)?.target?.value !== undefined
					? (e as React.ChangeEvent<HTMLInputElement>).target.value
					: (e as InputNumberChangeEvent)?.value !== undefined
					? (e as InputNumberChangeEvent).value
					: prev[field],
		}));
	};

	const footer = (
		<div>
			<Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
			<Button label="Save" icon="pi pi-check" onClick={handleSave} />
		</div>
	);

	return (
		<Dialog
			visible={visible}
			header={patientData?.id ? "Edit Patient" : "Add New Patient"}
			className="p-fluid"
			footer={footer}
			onHide={onHide}
		>
			{patientData && (
				<div className={s.patientForm}>
					<div className="field">
						<label htmlFor="name">Name</label>
						<InputText
							id="name"
							value={patientData.name}
							onChange={(e) => handleChange(e, "name")}
							placeholder="Enter Name"
						/>
					</div>
					<div className="field">
						<label htmlFor="age">Age</label>
						<InputNumber
							id="age"
							value={patientData.age}
							onChange={(e) => handleChange(e, "age")}
							max={999}
						/>
					</div>
					<div className="field">
						<label htmlFor="condition">Primary Condition</label>
						<InputText
							id="condition"
							value={patientData.primaryCondition}
							onChange={(e) => handleChange(e, "primaryCondition")}
							placeholder="Enter Primary Condition"
						/>
					</div>
				</div>
			)}
		</Dialog>
	);
};
