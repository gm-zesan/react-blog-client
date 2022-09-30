import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
const Post = ({ img, item }) => {
    const PF = "http://localhost:5000/images/";
    const navigate = useNavigate();
    const handlePost = (id) => {
        navigate(`/post/${id}`);
    };
    return (
        <div className="post">
            {item.photo && (
                <img className="postImg" src={PF + item.photo} alt="" />
            )}
            <div className="postInfo">
                <div className="postCats">
                    {item.categories.map((c, index) => (
                        <Link className="link" key={index} to={`/?cat=${c}`}>
                            <span className="postCat">{c}</span>
                        </Link>
                    ))}
                </div>
                <Link className="link" to={`/?user=${item.username}`}>
                    <b className="singlePostAuthor">{item.username}</b>
                </Link>
                <span
                    onClick={() => handlePost(item._id)}
                    className="postTitle"
                >
                    {item.title}
                </span>
                <hr />
                <span className="postDate">
                    {new Date(item.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">{item.desc}</p>
        </div>
    );
};

export default Post;
