import logo from "./assets/logo (1).png";
import LogoutButton from "./Logout";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container d-flex justify-content-between align-items-center">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <div>Project Management Tool</div>
        </a>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
