import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./SinglePost.css";
const SinglePost = () => {
    const PF = "http://localhost:5000/images/";
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getSinglePost = async () => {
            const res = await axios.get(
                `http://localhost:5000/api/post/${postId}`
            );
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getSinglePost();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/post/${postId}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/post/${postId}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {}
    };
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        className="singlePostImg"
                        src={PF + post.photo}
                        alt=""
                    />
                )}

                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt on"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b className="singlePostAuthor">{post.username}</b>
                        </Link>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
