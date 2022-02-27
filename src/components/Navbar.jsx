import React, { useContext, useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsGithub, BsFacebook, BsPlusLg } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import {
  RiBarChartHorizontalFill,
  RiUser3Fill,
  RiAdminFill,
} from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink as Nlink } from "react-router-dom";
import { RandomWordContext, UserContext } from "./App";
const MainNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // data from user context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // destructuring user info
  const {
    avatar_url,
    bio,
    blog,
    location,
    login,
    name,
    html_url,
    email,
    accessToken,
  } = loggedInUser;

  // random word context
  const [rw, setRw] = useContext(RandomWordContext);
  // random alphavet
  const randomWord = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  useEffect(() => {
    let rww = randomWord();
    setRw(rww);
  }, []);

  // sign out
  const signOut = () => {
    setLoggedInUser({});
  };
  return (
    <div className={styles.navbar__wrapper}>
      <Navbar className={styles.nav__background} expand="md">
        <div className="container">
          <Link to="/">
            <NavbarBrand>
              <span className={styles.brand__title}>Free CSS Form</span>
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={toggle} className={styles.toggler__icon}>
            <RiBarChartHorizontalFill />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className={styles.collaps__area}>
            <Nav className="mx-auto" navbar>
              <div className={styles.nav}>
                <NavItem>
                  <Nlink exact activeClassName={styles.activeNav} to="/create">
                    <a className={styles.link}>
                      <BsPlusLg />
                      <NavLink>Create</NavLink>
                    </a>
                  </Nlink>
                </NavItem>
                <NavItem>
                  <Nlink
                    exact
                    activeClassName={styles.activeNav}
                    to="/contributors"
                  >
                    <a className={styles.link}>
                      <FaUsers />
                      <NavLink>Contributors</NavLink>
                    </a>
                  </Nlink>
                </NavItem>
                {!email && (
                  <NavItem>
                    <Nlink
                      activeClassName={styles.activeNav}
                      to="/auth/sign-in"
                    >
                      <a className={styles.link}>
                        <BsGithub />
                        <NavLink>Sign in</NavLink>
                      </a>
                    </Nlink>
                  </NavItem>
                )}

                {email && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className={styles.user_profile}>
                      <img src={avatar_url} alt="user-img" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem className={styles.user__info__flex}>
                        <Link to={`/profile/${login}`}>
                          <RiUser3Fill className={styles.user_icon} /> Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <button
                          onClick={signOut}
                          className={styles.logout__btn}
                        >
                          <AiOutlineLogout className={styles.user_icon} /> Log
                          out
                        </button>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </div>
            </Nav>
            <div className={styles.follow__btns}>
              <button
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/shakilbaburjhuli",
                    "_blank"
                  )
                }
              >
                <BsFacebook className={styles.social_icon} />
              </button>
              <button
                onClick={() =>
                  window.open("https://github.com/shakil-babu", "_blank")
                }
              >
                <BsGithub className={styles.social_icon} />
              </button>

              {email === "personal.shakil.babu@gmail.com" ||
              email === "darktoolblue@gmail.com" ||
              email === "shakilbabu303@gmail.com" ? (
                <Link
                  style={{ textDecoration: "none", background: "#f50057" }}
                  to={`/secure/${rw}/admin`}
                >
                  <button>
                    <RiAdminFill className={styles.social_icon} />
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
