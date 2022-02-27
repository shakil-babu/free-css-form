import React, { useState, useEffect } from "react";
import styles from "../styles/Footer.module.css";

// Component started here
const Footer = () => {
  // for current year
  const [date, setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear());

  // useEffect for calling getYear function
  useEffect(() => {
    getYear();
  }, []);
  return (
    <>
      {/* ====================== Footer area ========================= */}
      <div className={styles.footer_dark}>
        <footer>
          <div className="container">
            <div className="row">
              <div className={`col-sm-6 col-md-3 ${styles.item}`}>
                <h3>Benefits 🤩</h3>
                <ul>
                  <li>
                    <a href="#">Free form</a>
                  </li>
                  <li>
                    <a href="#">Open source</a>
                  </li>
                  <li>
                    <a href="#">Easy to use/customize</a>
                  </li>
                </ul>
              </div>
              <div className={`col-sm-6 col-md-3 ${styles.item}`}>
                <h3>Features 😍 </h3>
                <ul>
                  <li>
                    <a href="#">Create</a>
                  </li>
                  <li>
                    <a href="#">Contributors</a>
                  </li>
                  <li>
                    <a href="#">User Profile</a>
                  </li>
                  <li>
                    <a href="#">Code Editors</a>
                  </li>
                  <li>
                    <a href="#">And More</a>
                  </li>
                </ul>
              </div>
              <div className={`col-md-6 ${styles.item && styles.text}`}>
                <h3>Free CSS Form</h3>
                <p>
                  Find the best css form for your project. There are different
                  types of form just choose one which is suited. Also you can
                  create your own form then you will get featured on this page.
                </p>
              </div>
            </div>
            <p className={styles.copyright}>
              <a
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  marginRight: "8px",
                }}
                href="https://www.facebook.com/profile.php?id=100025305922873"
                target="_blank"
              >
                Shakil Babu
              </a>
              © {date}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
