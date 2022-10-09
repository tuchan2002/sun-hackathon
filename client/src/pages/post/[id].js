import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostById } from "../../redux/actions/postAction";
import { getDataAPI } from "../../utils/fetchData";

const PostDetail = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, post, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [isCallbackComment, setIsCallbackComment] = useState(false);

  useEffect(() => {
    dispatch(getPostById({ id, auth }));
    // get comment api
    const fetchDataComment = async () => {
      const resComment = await getDataAPI(`comments/${id}`, auth);
      setComments(resComment.comments);
    };

    fetchDataComment();
  }, [dispatch, id, auth, isCallbackComment]);

  console.log(post);

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
      <div>
        <textarea
          placeholder="Enter content..."
          type="text"
          required
          value={content}
          rows="3"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={commentSubmit}>SEND</button>
      </div>
      {comments?.map((comment, index) => (
        <h5 key={index} style={{ border: "1px solid #ccc" }}>
          {comment.userDisplayName} - {comment.content}
        </h5>
      ))}
    </>
  );
};

export default PostDetail;
