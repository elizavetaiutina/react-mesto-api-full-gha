import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

// не забыть удалить линк у лого
function Header({ namelink, link, userData, onSignOut, loggedIn }) {
  const exitUser = () => {
    if (loggedIn) {
      onSignOut();
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип- Место" className="logo" />
      <div className="header__info">
        <p className="header__userinfo">{userData}</p>
        <Link to={`/${link}`} className="header__link" onClick={exitUser}>
          {namelink}
        </Link>
      </div>
    </header>
  );
}

export default Header;
