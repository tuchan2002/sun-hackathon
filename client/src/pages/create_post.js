import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/actions/postAction";

const CreatePost = () => {
  const [postData, setPostdata] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleSubmit = () => {
    dispatch(createPost({ data: postData, auth }));
    navigate("/posts");
  };

  return (
    <>
      <div
        className="d-flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Create Post</h2>
        <div>
          <Button
            variant="primary"
            disabled={false}
            style={{ marginRight: "16px", marginLeft: "16px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            disabled={false}
            onClick={() => navigate("/posts")}
          >
            Cancel
          </Button>
        </div>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={postData.title}
            onChange={(e) =>
              setPostdata({ ...postData, title: e.target.value })
            }
            type="text"
            placeholder="Post's title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            value={postData.content}
            onChange={(e) =>
              setPostdata({
                ...postData,
                content: e.target.value,
              })
            }
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default CreatePost;
