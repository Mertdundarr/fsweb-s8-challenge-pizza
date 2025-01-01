import React from "react";
import "./css/ConfirmationPage.css";

const ConfirmationPage = () => {
  return (
    <div className="confirmation-page">
      <div className="content">
        <h1 className="title">Teknolojik Yemekler</h1>
        <div className="message-container">
          <p>TEBRİKLER!</p>
          <p className="sub-message">SİPARİŞİNİZ ALINDI!</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;