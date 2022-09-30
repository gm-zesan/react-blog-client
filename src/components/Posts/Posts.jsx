import React from "react";
import Post from "../Post/Post";
import "./Posts.css";
const Posts = ({ items, filterItem}) => {
    return (
        <div className="posts">
            {items.map((item) => (
                <Post
                    key={item._id}
                    item={item}
                    filterItem={filterItem}
                    img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
            ))}
        </div>
    );
};

export default Posts;
