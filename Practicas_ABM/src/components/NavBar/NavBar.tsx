import { Link } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="" style={{ textDecoration: "none" }} className="links">
        Inicio
      </Link>
      <Link to="/contacto" style={{ textDecoration: "none" }} className="links">
        Contacto
      </Link>
    </div>

  )
}
