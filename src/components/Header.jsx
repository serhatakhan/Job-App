import { NavLink } from "react-router-dom"
import { GiKeyboard } from "react-icons/gi";

const Header = () => {
  return (
    <header>
        <h2>İş Takip <GiKeyboard className="brand-icon" /></h2>

        <nav>
            <NavLink to={"/"}>İş Listesi</NavLink>
            <NavLink to={"/add"}>İş Ekle</NavLink>
        </nav>
    </header>
  )
}

export default Header