import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastMessage = ({ title, message, bgColor }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="position-relative">
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          bg={bgColor}
        >
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ToastMessage;
