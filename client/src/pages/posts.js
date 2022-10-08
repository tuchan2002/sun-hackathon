import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts } from "../redux/actions/postAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

const Post = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { auth, post } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getAllPosts({ auth }));
    }, [dispatch, auth]);

    console.log(post);

    const handleOnClickCreate = (e) => {};

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Posts</h3>
                <Button variant="primary" onClick={handleOnClickCreate}>
                    Create
                </Button>
            </div>
            <div style={{ paddingLeft: "80px", paddingRight: "80px" }}>
                {post.posts?.map((item, index) => (
                    <Card
                        className="text-left mt-4"
                        key={index}
                        onClick={() => navigate(`/post/${item._id}`)}
                    >
                        <Card.Header>
                            <img
                                src={item.User.avatar}
                                alt="..."
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "100px",
                                    marginRight: "8px",
                                }}
                            />
                            {item.User.displayName}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Row>
                                <Col className="text-center">
                                    <AiOutlineHeart size={32}></AiOutlineHeart>
                                </Col>
                                <Col className="text-center">
                                    <AiOutlineComment
                                        size={32}
                                    ></AiOutlineComment>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Post;
