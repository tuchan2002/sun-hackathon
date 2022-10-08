import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getAllHistory } from "../../redux/actions/historyAction";
import moment from "moment";
import { BsStarFill } from "react-icons/bs";
import rank1 from "../../utils/images/rank1.jpeg";
import rank2 from "../../utils/images/rank2.jpeg";
import rank3 from "../../utils/images/rank3.jpeg";
import Swal from "sweetalert2";
import { IoAdd, IoArrowForwardCircle, IoClose } from "react-icons/io5";

const Profile = () => {
  const [userProfileData, setUserProfileData] = useState({
    university: "",
    graduationYear: "",
  });

  const onChangeUserProfileInput = (e) => {
    setUserProfileData({ ...userProfileData, [e.target.name]: e.target.value });
  };

  const [images, setImages] = useState(false);
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      if (!file) {
        Swal.fire({
          icon: "error",
          text: "File not exist.",
        });
        return;
      }

      if (file.size > 1024 * 1024) {
        Swal.fire({
          icon: "error",
          text: "Size too large!",
        });
        return;
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Swal.fire({
          icon: "error",
          text: "File format is incorrect.",
        });
        return;
      }

      console.log("FILE", file);
      let formData = new FormData();
      formData.append("image", file);
      console.log(formData);

      const res = await postDataAPI(`upload/image_up`, formData, auth.token);

      console.log(res);
      setImages(res.images[0]);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      console.log(images);
      await postDataAPI("upload/image_de", { imageUrls: [images.public_id] });

      setImages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleSubmit = async () => {
    console.log("SUBMIT");

    const response = await postDataAPI(
      "users/profile",
      {
        university: userProfileData.university,
        graduationYear: -(-userProfileData.graduationYear),
        avatar: images
          ? images?.secure_url
          : "https://res.cloudinary.com/dxnfba463/image/upload/v1664374422/images_iepweu.png",
      },
      auth.token
    );

    await Swal.fire({
      icon: "success",
      text: response.data.message,
    });

    setUserProfile({
      ...userProfile,
      university: userProfileData.university,
      graduationYear: -(-userProfileData.graduationYear),
      avatar: images
        ? images?.secure_url
        : "https://res.cloudinary.com/dxnfba463/image/upload/v1664374422/images_iepweu.png",
    });
    handleClose();
  };
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={userProfile?.avatar}
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              onChange={handleUpload}
              alt="Avatar"
            />
          </div>
          <div>
            <h4>{userProfile?.displayName}</h4>
            <h6>{userProfile?.email}</h6>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <p style={{ fontWeight: "bold" }}>University:</p>
              <p> {userProfile?.university}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <p style={{ fontWeight: "bold" }}>Graduation Year: </p>
              <p>{userProfile?.graduationYear}</p>{" "}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>{totalLike} Star</h3>
            <img
              className="rounded-circle"
              style={{ width: "150px" }}
              src={selectRank()}
              alt=""
            />
          </div>
          {auth.user._id === id && (
            <Button variant="primary" onClick={handleShow}>
              Edit
            </Button>
          )}
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
      {/* Modal change password */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PROFILE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: "fit-content",
                alignSelf: "center",
              }}
            >
              <img
                src={images ? images?.secure_url : userProfile?.avatar}
                className="rounded-circle"
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                  alignSelf: "center",
                }}
                alt="Avatar"
              />
              {!images ? (
                <label htmlFor="file_upload" style={{ cursor: "pointer" }}>
                  UPLOAD
                </label>
              ) : (
                <IoClose
                  size={32}
                  onClick={handleDestroy}
                  style={{
                    position: "absolute",
                    top: "-5%",
                    right: "-10%",
                    cursor: "pointer",
                  }}
                />
              )}
              <input
                type="file"
                name="file"
                id="file_upload"
                onChange={handleUpload}
                className="d-none"
              />
            </div>
            <Form.Group controlId="formBasicOldPassword">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="displayName"
                name="displayName"
                value={auth.user.displayName}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={auth.user.email}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmNewPassword">
              <Form.Label>University</Form.Label>
              <Form.Control
                type="text"
                placeholder="University..."
                name="university"
                value={userProfileData.university}
                onChange={(e) => onChangeUserProfileInput(e)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmNewPassword">
              <Form.Label>Graduation Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Graduation Year..."
                name="graduationYear"
                value={userProfileData.graduationYear}
                onChange={(e) => onChangeUserProfileInput(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
