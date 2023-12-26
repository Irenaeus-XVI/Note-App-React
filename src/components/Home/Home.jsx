import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { NoteContext } from "../../Context/NoteContext";
import Loading from "../Loading/Loading";
import Note from "../Note/Note";
import { getUserNotes } from "../../utils/Note";
import { UserContext } from "../../Context/UserContext";

export default function Home() {

  const { token } = useContext(UserContext)

  const { notes, setNotes } = useContext(NoteContext)

  useEffect(() => {
    getUserNotes({ token, updater: setNotes })
  }, [])
  return (
    <>

      <div className="container-flued">
        <div className="row">
          <h2 className="font-Montserrat h4 heading">
            <i className="bi bi-folder me-2"></i>My Notes
          </h2>


          {notes == null ? <Loading /> : notes.length == 0 ? <h2>No Notes Found </h2> : <div className={styles.notes}>
            {notes.map((note) => <Note note={note} key={note._id} />)}
          </div>}
        </div>
      </div>

    </>
  );
}
