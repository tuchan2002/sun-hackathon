import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPostById } from "../../redux/actions/postAction";

const PostDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth, post } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById({ id, auth }));
    }, [dispatch, id, auth]);

    console.log(post);

    return (
        <>
            <h3>PostDetail</h3>
        </>
    );
};

export default PostDetail;
