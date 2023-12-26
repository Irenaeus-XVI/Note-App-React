import { useContext } from "react";
import { showDeleteModal, showUpdateModal } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({ note }) {


  const { token } = useContext(UserContext)
  const { notes, setNotes } = useContext(NoteContext)
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{note?.title}   </h2>
          <p className={`mb-0 mt-2`}>{note?.content}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={() => showUpdateModal({ prevTitle: note.title, prevContent: note.content, noteId: note._id, token, updater: setNotes })}></i>

          <i className="bi bi-archive-fill pointer text-danger" onClick={() => showDeleteModal({ token, noteId: note._id, updater: setNotes })}></i>
        </div>
      </div>
    </>
  );
}
