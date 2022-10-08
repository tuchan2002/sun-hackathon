import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHistory } from "../redux/actions/historyAction";

const Profile = () => {
  const { auth, history } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHistory(auth));
  }, [auth, dispatch]);

  console.log(history);
  return (
    <div>
      <h2>HISTORY</h2>
      {history?.allHistory?.map((item) => (
        <h3 key={item._id}>{item.quiz.title}</h3>
      ))}
    </div>
  );
};

export default Profile;
