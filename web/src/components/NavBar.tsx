import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.div`
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  .navbar {
    overflow: hidden;
    background-color: rgb(30, 30, 30);
    height: 40px;
  }
  .navbar a {
    float: left;
    font-size: 14px;
    color: white;
    text-align: center;
    padding: 10px 16px;
    text-decoration: none;
  }
  .navbar-header {
    /* font-weight: bold; */
  }
  .dropdown {
    float: left;
    overflow: hidden;
  }
  .dropdown .dropbtn {
    font-size: 14px;
    border: none;
    outline: none;
    color: white;
    padding: 10px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }
  .navbar-pages a:hover,
  .dropdown:hover .dropbtn {
    /* background-color: darkblue; */
    color: #64b5f6;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgb(30, 30, 30);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown-content a {
    float: none;
    color: lightgray;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }
  .dropdown-content a:hover {
    background-color: #444;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .navbar-right {
    float: right;
  }
`;

interface NavBarProps {
  loggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  console.log("NavBar evaluated");

  const handleLoginClick = () => {
    props.onLoginClick();
  };

  const handleLogoutClick = () => {
    props.onLogoutClick();
  };

  return (
    <StyledNavBar>
      <div className="navbar">
        <div className="navbar-header">
          <NavLink to="/" style={{ display: "flex" }}>
            {/* <Logo src={`logo192.png`} size={20} /> */}
            TODO
          </NavLink>
        </div>
        <div className="navbar-pages">
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/tags">Tags</NavLink>
        </div>
        <div className="dropdown">
          {/* the css in forms.css is making this uppercase */}
          <button className="dropbtn">
            Admin
            <i className="fa fa-caret-down" style={{ paddingLeft: "10px" }}></i>
          </button>
          <div className="dropdown-content">
            <NavLink to="/admin/assets">Assets</NavLink>
            <NavLink to="/test">Test Page</NavLink>
          </div>
        </div>
        <div className="navbar-right">
          {props.loggedIn && (
            <span>
              <NavLink to="/account">
                <i className="fas fa-user" style={{ cursor: "pointer" }}></i>
              </NavLink>
              <NavLink to="/login" onClick={handleLogoutClick}>
                Logout
              </NavLink>
            </span>
          )}
          {!props.loggedIn && (
            <NavLink to="/login" onClick={handleLoginClick}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </StyledNavBar>
  );
};

export default NavBar;
