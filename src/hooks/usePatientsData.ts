import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatient, deletePatient, fetchPatients, updatePatient } from "../api/patientsApi";
import { Toast } from "primereact/toast";
import { PATIENTS_QUERY_KEY } from "../constants/constants";

interface UsePatientsDataProps {
	toast: React.RefObject<Toast | null>;
	onDialogHide: () => void;
}

export const usePatientsData = ({ toast, onDialogHide }: UsePatientsDataProps) => {
	const queryClient = useQueryClient();

	const {
		data: patients,
		isLoading,
		isFetching,
		isError,
		error,
	} = useQuery({
		queryKey: [PATIENTS_QUERY_KEY],
		queryFn: fetchPatients,
	});

	const addMutation = useMutation({
		mutationFn: addPatient,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
			onDialogHide();
			toast?.current?.show({
				severity: "success",
				summary: "Success",
				detail: "Patient added successfully",
				life: 2000,
			});
		},
	});

	const updateMutation = useMutation({
		mutationFn: updatePatient,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
			onDialogHide();
			toast?.current?.show({
				severity: "success",
				summary: "Success",
				detail: "Patient updated successfully",
				life: 2000,
			});
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deletePatient,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
			toast?.current?.show({
				severity: "success",
				summary: "Success",
				detail: "Patient deleted successfully",
				life: 2000,
			});
		},
	});

	return {
		patients,
		isLoading,
		isFetching,
		isError,
		error,
		addPatient: addMutation.mutate,
		updatePatient: updateMutation.mutate,
		deletePatient: deleteMutation.mutate,
	};
};
