// src/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./css/HomePage.css";

const HomePage = () => {
  return (
    <div className="pizza-home">
      <img src="/images/iteration-1-images/home-banner.png" alt="Pizza" className="banner-img" />
      <div className="content-overlay">
        <h1>Teknolojik Yemekler</h1>
        <p>KOD ACIKTIRIR </p>
        <p>PİZZA, DOYURUR</p>
        <Link to="/order">
          <button className="hungry-btn">Açım!</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
