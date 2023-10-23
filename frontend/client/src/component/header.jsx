import logo from "./assets/logo (1).png";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project Management Tool</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
