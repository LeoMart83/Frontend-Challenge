import { PATIENT_NOTES_KEY, PATIENTS_STORAGE_KEY } from "../constants/constants";
import { Note, Patient } from "../types/types";

const defaultPatients: Patient[] = [
	{ id: "1", name: "Anya Petrova", age: 35, primaryCondition: "Hypertension" },
	{ id: "2", name: "Kenji Tanaka", age: 62, primaryCondition: "Type 2 Diabetes" },
	{ id: "3", name: "Isabelle Dubois", age: 48, primaryCondition: "Asthma" },
	{ id: "4", name: "Omar Hassan", age: 78, primaryCondition: "Chronic Kidney Disease" },
	{ id: "5", name: "Sofia Rossi", age: 29, primaryCondition: "Migraine" },
	{ id: "6", name: "Hans Müller", age: 55, primaryCondition: "Coronary Artery Disease" },
];

const loadPatientsFromStorage = (): Patient[] => {
	const storedPatients = localStorage.getItem(PATIENTS_STORAGE_KEY);
	return storedPatients ? JSON.parse(storedPatients) : [...defaultPatients];
};

const savePatientsToStorage = (patientsToSave: Patient[]): void => {
	localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patientsToSave));
};

let mockPatients = loadPatientsFromStorage();

export const fetchPatientById = async (id: string): Promise<Patient> => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	const patient = mockPatients.find((p) => p.id === id);
	if (!patient) {
		throw new Error(`Patient with ID "${id}" not found`);
	}
	return patient;
};

export const fetchPatients = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockPatients;
};

export const addPatient = async (newPatient: Omit<Patient, "id">): Promise<Patient> => {
	await new Promise((resolve) => setTimeout(resolve, 300));
	const addedPatient = { ...newPatient, id: String(Math.floor(Math.random() * 1001)) };
	mockPatients = [...mockPatients, addedPatient];
	savePatientsToStorage(mockPatients);
	return addedPatient;
};

export const updatePatient = async (updatedPatient: Patient): Promise<Patient> => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const index = mockPatients.findIndex((p) => p.id === updatedPatient.id);
	if (index !== -1) {
		mockPatients[index] = updatedPatient;
		savePatientsToStorage(mockPatients);
		return updatedPatient;
	} else {
		throw new Error(`Patient with ID "${updatedPatient.id}" not found for update`);
	}
};

const deletePatientNotes = (patientId: string): void => {
	const allNotesString = localStorage.getItem(PATIENT_NOTES_KEY);
	if (allNotesString) {
		const allNotes = JSON.parse(allNotesString) as Record<string, Note[]>;
		if (allNotes[patientId]) {
			delete allNotes[patientId];
			localStorage.setItem(PATIENT_NOTES_KEY, JSON.stringify(allNotes));
		}
	}
};

export const deletePatient = async (id: string): Promise<string> => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	mockPatients = mockPatients.filter((p) => p.id !== id);
	savePatientsToStorage(mockPatients);
	deletePatientNotes(id);
	return id;
};
