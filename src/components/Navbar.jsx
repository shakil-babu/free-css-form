import React, { useContext, useState } from "react";
import firebase from "firebase/compat/app";
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
import { RiBarChartHorizontalFill, RiUser3Fill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink as Nlink } from "react-router-dom";
import { UserContext } from "./App";
import { db } from "../Firebase/config.js";
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

  // add user info to database
  // const addUserInfoIntoFirestore = () => {
  //   // add data to database(firestore)
  //   db.collection("todos").add({
  //     loggedInUser,
  //   });
  // };

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
                  <Nlink activeClassName={styles.activeNav} to="/contributors">
                    <a className={styles.link}>
                      <IoMdContacts />
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
                        <RiUser3Fill className={styles.user_icon} />
                        <Link to={`/profile/${login}`}>Profile</Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <button className={styles.logout__btn}>
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
            </div>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
