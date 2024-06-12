import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Home.module.scss";
import arrowHome from "../../assets/images/arrowHome.svg";
import logo from "../../assets/images/logo.svg";

const Home = () => {
  return (
    <div className={styles.home}>
      <img src={logo} className={styles.logo} alt="" />
      <Link to="/dresses" className={styles.dressesDiv}>
        <h1>Dresses</h1>
        <img src={arrowHome} alt="" />
      </Link>
      <Link to="/makeup" className={styles.makeupDiv}>
        <h1>Makeup</h1>
        <img src={arrowHome} alt="" />
      </Link>
    </div>
  );
};

export default Home;
