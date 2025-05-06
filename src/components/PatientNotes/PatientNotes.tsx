import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { PatientNote } from "../Note/Note";
import { PATIENT_NOTES_KEY } from "../../constants/constants";
import { Note } from "../../types/types";
import s from "./PatientNotes.module.scss";

interface PatientNotesProps {
	patientId: string | undefined;
}

export const PatientNotes: React.FC<PatientNotesProps> = ({ patientId }) => {
	const [newNoteText, setNewNoteText] = useState("");
	const [notes, setNotes] = useState<Note[]>([]);
	const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
	const [editText, setEditText] = useState("");

	const getPatientNotes = (id: string | undefined): Note[] => {
		if (!id) return [];
		const notesString = localStorage.getItem(PATIENT_NOTES_KEY);
		const allNotes: Record<string, Note[]> = notesString ? JSON.parse(notesString) : {};
		return allNotes[id] || [];
	};

	const savePatientNotes = (id: string | undefined, notesToSave: Note[]): void => {
		if (!id) return;
		const allNotes = JSON.parse(localStorage.getItem(PATIENT_NOTES_KEY) || "{}") as Record<
			string,
			Note[]
		>;
		allNotes[id] = notesToSave;
		localStorage.setItem(PATIENT_NOTES_KEY, JSON.stringify(allNotes));
	};

	const handleAddNote = () => {
		if (patientId && newNoteText.trim()) {
			const newNote: Note = {
				id: Date.now(),
				text: newNoteText.trim(),
				createdAt: new Date().toISOString(),
			};
			const updatedNotes = [...notes, newNote];
			setNotes(updatedNotes);
			savePatientNotes(patientId, updatedNotes);
			setNewNoteText("");
		}
	};

	const handleSaveEdit = (noteId: number) => {
		if (patientId) {
			const updatedNotes = notes.map((note) =>
				note.id === noteId ? { ...note, text: editText } : note
			);
			setNotes(updatedNotes);
			savePatientNotes(patientId, updatedNotes);
			setEditingNoteId(null);
			setEditText("");
		}
	};

	const handleCancelEdit = () => {
		setEditingNoteId(null);
		setEditText("");
	};

	const handleEditNote = (note: Note) => {
		setEditingNoteId(note.id);
		setEditText(note.text);
	};

	const handleDeleteNote = (noteId: number) => {
		if (patientId) {
			const updatedNotes = notes.filter((note) => note.id !== noteId);
			setNotes(updatedNotes);
			savePatientNotes(patientId, updatedNotes);
		}
	};

	useEffect(() => {
		if (patientId) {
			const initialNotes = getPatientNotes(patientId);
			setNotes(initialNotes);
		}
	}, [patientId]);

	return (
		<div className={s.notesContainer}>
			<h2>Notes</h2>
			<div className={s.addNote}>
				<InputTextarea
					value={newNoteText}
					onChange={(e) => setNewNoteText(e.target.value)}
					rows={3}
					cols={60}
					placeholder="Add a new note"
				/>
				<Button label="Add Note" onClick={handleAddNote} />
			</div>

			{notes.length > 0 ? (
				<ul className={s.notesList}>
					{notes.map((note) => (
						<li key={note.id} className={s.noteItem}>
							{editingNoteId === note.id ? (
								<div className={s.editNoteArea}>
									<InputTextarea
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										rows={3}
										cols={60}
									/>
									<div className={s.editActions}>
										<Button
											label="Save"
											onClick={() => handleSaveEdit(note.id)}
										/>
										<Button
											label="Cancel"
											className="p-button-secondary"
											onClick={handleCancelEdit}
										/>
									</div>
								</div>
							) : (
								<PatientNote
									note={note}
									handleEditNote={handleEditNote}
									handleDeleteNote={handleDeleteNote}
								/>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>No notes yet.</p>
			)}
		</div>
	);
};
