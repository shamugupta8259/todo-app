import react, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "./AlertContext";

const NoteState = (props) => {
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	const alertContext = useContext(AlertContext);
	// get all notes
	const getnotes = async () => {
		// API call
		const response = await fetch(
			"http://localhost:5005/api/notes/fetchallnotes",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"auth-token": localStorage.getItem("token"),
				},
			}
		);
		const json = await response.json();
		// console.log(json )
		setNotes(json);
	};

	// add a note
	const addNote = async (title, description, tag) => {
		// TODO API call
		const response = await fetch("http://localhost:5005/api/notes/addnote", {
			method: "POST",
			headers: {
				"auth-token": localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const note = await response.json();

		// concat hota add karna ka liya l
		setNotes(notes.concat(note));
	};

	//  delete note
	const deleteNote = async (id) => {
		// api call
		// console.log(id);
		const response = await fetch(
			`http://localhost:5005/api/notes/deletenote/${id}`,
			{
				method: "DELETE",
				headers: {
					"auth-token": localStorage.getItem("token"),
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);
		const json = await response.json();
		// console.log(json)
		let newNotes = JSON.parse(JSON.stringify(notes));
		newNotes = newNotes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
		// console.log("DElete note" + id)
	};

	// update note
	const editNote = async (id, title, description, tag) => {
		// API call

		const response = await fetch(
			`http://localhost:5005/api/notes/updatenote/${id}`,
			{
				method: "PUT",
				headers: {
					"auth-token": localStorage.getItem("token"),
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify({ title, description, tag }),
			}
		);
		const json = response.json();
		//  asa humna isliya kiya ha ki kyo ki state wala object ko directly change nahi kar saktais
		//     JSON.stringify(): This method takes a JavaScript object and then transforms it into a JSON string.
		//  JSON.parse(): This method takes a JSON string and then transforms it into a JavaScript object.
		let newNotes = JSON.parse(JSON.stringify(notes));
		//Logic to edit ntoe in client
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider
			value={{ notes, addNote, deleteNote, editNote, getnotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
