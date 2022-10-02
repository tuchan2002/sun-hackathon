import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && <h1>ERROR</h1>}

      {alert.success && <h1>SUCCESS</h1>}
    </div>
  );
};

export default Alert;
