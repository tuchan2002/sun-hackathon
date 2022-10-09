import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

import { getPostById } from "../../redux/actions/postAction";
import { getDataAPI, putDataAPI } from "../../utils/fetchData";
import Button from "react-bootstrap/esm/Button";

const PostDetail = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, post, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [isCallbackComment, setIsCallbackComment] = useState(false);

  const [resLikeFeat, setResLikeFeat] = useState();
  useEffect(() => {
    const featchresLikeFeat = async () => {
      const res = await getDataAPI(`posts/${id}`, auth.token);
      setResLikeFeat(res.data);
      setTymState(res?.data.liked);
    };
    featchresLikeFeat();
  }, []);
  console.log("data", resLikeFeat);
  const [tymState, setTymState] = useState();

  useEffect(() => {
    dispatch(getPostById({ id, auth }));
    // get comment api
    const fetchDataComment = async () => {
      const resComment = await getDataAPI(`comments/${id}`, auth);
      setComments(resComment.comments);
    };

    fetchDataComment();
  }, [dispatch, id, auth, isCallbackComment]);

  const toggleTym = async () => {
    setTymState(!tymState);
    const res = await putDataAPI(
      `posts/likePost/${id}?userId=${auth.user._id}&liked=${resLikeFeat.liked}`,
      {},
      auth.token
    );
    console.log(res);
  };
  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (data) => {
        setComments([data, ...comments]);
      });

      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);

  useEffect(() => {
    if (socket && auth.user) {
      socket.emit("joinRoom", { userId: auth?.user?._id, roomId: id });
    }
  }, [socket, id, auth.user]);

  const commentSubmit = (e) => {
    e.preventDefault();
    console.log("OK");
    socket.emit("createComment", {
      userAvatar: auth.user.avatar,
      userDisplayName: auth.user.displayName,
      content,
      postId: id,
    });
    setContent("");
    setIsCallbackComment(!isCallbackComment);
  };
  return (
    <>
      <h3>PostDetail</h3>
      <Card className="text-left mt-4">
        <Card.Header>
          <img
            src={post.post.User?.avatar}
            alt="..."
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "100px",
              marginRight: "8px",
            }}
          />
          {post.post.User?.displayName}
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.post?.title}</Card.Title>
          <Card.Text>{post.post?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row>
            <Col className="text-center">
              <AiOutlineHeart
                style={{ color: tymState ? "red" : "black" }}
                size={"28"}
                onClick={() => {
                  toggleTym();
                }}
              ></AiOutlineHeart>
            </Col>
            <Col className="text-center">
              <AiOutlineComment size={"28"}></AiOutlineComment>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <div style={{ marginBottom: "40px" }}>
        <textarea
          placeholder="Enter content..."
          type="text"
          required
          value={content}
          rows="3"
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", marginTop: "4px" }}
        />
        <Button
          variant="primary"
          style={{ float: "right" }}
          onClick={commentSubmit}
        >
          SEND
        </Button>
      </div>
      {comments?.map((comment, index) => (
        <Card style={{ marginBottom: "8px" }}>
          <Card.Body>
            <Card.Title>
              <img
                src={comment.userAvatar}
                alt="..."
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "100px",
                  marginRight: "8px",
                }}
              />
              {comment.userDisplayName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              a few minutes ago
            </Card.Subtitle>
            <Card.Text>{comment.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PostDetail;
