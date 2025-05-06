export interface Patient {
	id: string;
	name: string;
	age: number;
	primaryCondition: string;
}

export interface Note {
	id: number;
	text: string;
	createdAt: string;
	isEditing?: boolean;
}
