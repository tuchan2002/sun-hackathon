import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { getDataAPI } from "../../utils/fetchData";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getAllHistory } from "../../redux/actions/historyAction";
import moment from "moment";
import { BsStarFill } from "react-icons/bs";
import rank1 from "../../utils/images/rank1.jpeg";
import rank2 from "../../utils/images/rank2.jpeg";
import rank3 from "../../utils/images/rank3.jpeg";

const Profile = () => {
  const { id } = useParams();
  const { auth, history } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHistory(auth));
  }, [auth, dispatch]);

  const [userProfile, setUserProfile] = useState();
  const [totalLike, setTotalLike] = useState(0);
  useEffect(() => {
    const fetchUserProfileData = async () => {
      const res = await getDataAPI(`users/profile/${id}`, auth.token);
      setUserProfile(res.data.user);
      const resTotalLike = await getDataAPI(
        `posts/totalLike/${id}`,
        auth.token
      );
      setTotalLike(resTotalLike.data.totalLike);
    };
    fetchUserProfileData();
  }, [id]);

  console.log(history);

  const selectRank = () => {
    if (totalLike >= 0 && totalLike < 1) {
      return rank1;
    } else if (totalLike >= 1 && totalLike < 2) {
      return rank2;
    } else if (totalLike >= 2) {
      return rank3;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        <img
          src={userProfile?.avatar}
          className="rounded-circle"
          style={{ width: "150px" }}
          alt="Avatar"
        />
        <div>
          <h5>{userProfile?.displayName}</h5>
          <h6>{userProfile?.email}</h6>
          <p>University: {userProfile?.university}</p>
          <p>Graduation Year: {userProfile?.graduationYear}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>
            {totalLike} <BsStarFill />
          </h3>
          <img
            className="rounded-circle"
            style={{ width: "150px" }}
            src={selectRank()}
            alt=""
          />
        </div>
        <Button variant="primary">Edit</Button>
      </div>
      <div>
        <h4>History Quizzes</h4>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Results</th>
              <th>Start Time</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {history.allHistory?.map((item) => (
              <tr key={item._id}>
                <td>{item.quiz.title}</td>
                <td>
                  {item.result} / {item.quiz.questions.length}
                </td>
                <td>{item.createdAt}</td>
                <td>
                  <Link to={`/quiz/${item.quiz._id}`}>IconEyes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
