import React from "react";
import { Button } from "primereact/button";
import s from "./Note.module.scss";
import { Note } from "../../types/types";

interface NoteProps {
	note: Note;
	handleEditNote: (note: Note) => void;
	handleDeleteNote: (noteId: number) => void;
}

export const PatientNote: React.FC<NoteProps> = ({ note, handleEditNote, handleDeleteNote }) => {
	return (
		<div className={s.note}>
			<div className={s.noteContent}>
				<p>{note.text}</p>
			</div>
			<div className={s.noteFooter}>
				<span>Created at: 2025-05-05</span>

				<div className={s.noteControls}>
					<Button
						icon="pi pi-pencil"
						className="p-button-rounded"
						style={{ height: "32px", width: "32px" }}
						onClick={() => handleEditNote(note)}
					/>
					<Button
						icon="pi pi-trash"
						className="p-button-rounded p-button-danger"
						style={{ height: "32px", width: "32px" }}
						onClick={() => handleDeleteNote(note.id)}
					/>
				</div>
			</div>
		</div>
	);
};
