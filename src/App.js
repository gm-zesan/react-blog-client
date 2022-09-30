import Home from "./Pages/Home/Home";
import Topbar from "./components/Topbar/Topbar";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Settings from "./Pages/Settings/Settings";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
    const { user } = useContext(Context);
    return (
        <div className="App">
            <Topbar></Topbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:postId" element={<Single />} />
                <Route path="/write" element={user ? <Write /> : <Login />} />
                <Route
                    path="/settings"
                    element={user ? <Settings /> : <Login />}
                />
                <Route path="/login" element={user ? <Home /> : <Login />} />
                <Route
                    path="/register"
                    element={user ? <Home /> : <Register />}
                />
                <Route
                    path="*"
                    element={
                        <div>
                            <h1>404</h1>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
