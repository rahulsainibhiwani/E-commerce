import React from "react";
import "./Loader.css";

const Loading = () => {
  return (
    <div className="loaders-container">
      <div className="container">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Loading;
