import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import "./Write.css";
const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) {}
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/post/create",
                newPost
            );
            window.location.replace(
                "http://localhost:3000/post/" + res.data._id
            );
        } catch (err) {}
    };
    return (
        <div className="write">
            {file && (
                <img
                    className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                    <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;
