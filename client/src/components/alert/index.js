import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import ToastMessage from "./ToastMessage";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && (
        <ToastMessage title="Error" message={alert.error} bgColor="danger" />
      )}

      {alert.success && (
        <ToastMessage
          title="Success"
          message={alert.success}
          bgColor="success"
        />
      )}
    </div>
  );
};

export default Alert;
