import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../../components/Posts/Posts";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
    const { search } = useLocation();
    const [items, setItems] = useState([]);
    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        const getMyPostData = async () => {
            const res = await axios.get(
                "http://localhost:5000/api/post" + search
            );
            setItems(res.data);
            setFilterItems(res.data);
        };
        getMyPostData();
    }, [search]);

    const filterItem = (username) => {
        // const filterPosts = filterItems.filter((p) => {
        //     return p.username === username;
        // });
        // console.log(filterPosts);
        // setItems(filterPosts);
    };
    return (
        <>
            <Header></Header>
            <div className="home">
                <Posts
                    items={items}
                    filterItem={filterItem}
                >
                </Posts>
                <Sidebar></Sidebar>
            </div>
        </>
    );
};

export default Home;
