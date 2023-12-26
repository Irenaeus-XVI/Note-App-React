import style from "./Note.module.css";

export default function Note({ note }) {
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{note.tile}</h2>
          <p className={`mb-0 mt-2`}>{note.content}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i className="bi bi-archive-fill pointer"></i>
        </div>
      </div>
    </>
  );
}
