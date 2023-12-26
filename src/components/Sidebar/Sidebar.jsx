import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { showAddModal } from '../../utils/Note.js'
import { NoteContext } from "../../Context/NoteContext.jsx";
export default function Sidebar({ isMinimized, setIsMinimized }) {

  const { logOut, token } = useContext(UserContext)
  const { setNotes } = useContext(NoteContext)

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button className="btn btn-main text-capitalize w-100 mb-3" onClick={() => showAddModal({ token, updater: setNotes })}>
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized ? '' : ' New Note'}

        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized ? '' : 'Home'}

            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i>
              {isMinimized ? '' : 'Search'}

            </NavLink>
          </li>
          <li>
            <span className="pointer" onClick={logOut}>
              <i className="bi bi-box-arrow-left me-2" ></i>
              {isMinimized ? '' : 'Log Out'}
            </span>
          </li>
          <li></li>
        </ul>
        <div className={`${style.change} shadow pointer`} onClick={() => setIsMinimized(!isMinimized)}>
          <i className={isMinimized ? `fa-solid fa-chevron-right ` : `fa-solid fa-chevron-left `} ></i>
        </div>
      </nav>
    </>
  );
}
