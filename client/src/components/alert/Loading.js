import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div
      className="position-fixed text-center"
      style={{
        background: "#0007",
        color: "white",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      <Spinner
        animation="border"
        variant="light"
        className="position-absolute"
        style={{
          top: "40%",
          width: "5rem",
          height: "5rem",
        }}
      />
    </div>
  );
};

export default Loading;
