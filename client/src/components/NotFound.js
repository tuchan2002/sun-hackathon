import React from "react";

const NotFound = () => {
  return (
    <div
      className="position-relative"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <h1
        className="position-absolute text-secondary"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        404 | Not Found.
      </h1>
    </div>
  );
};

export default NotFound;
