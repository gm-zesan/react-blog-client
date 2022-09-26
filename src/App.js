import Home from "./Pages/Home/Home";
import Topbar from "./components/Topbar/Topbar";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Settings from "./Pages/Settings/Settings";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
    const currentUser = false;
    return (
        <div className="App">
            <Topbar></Topbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:postid" element={<Single />} />
                <Route
                    path="/write"
                    element={currentUser ? <Write /> : <Login />}
                />
                <Route
                    path="/settings"
                    element={currentUser ? <Settings /> : <Login />}
                />
                <Route
                    path="/login"
                    element={currentUser ? <Home /> : <Login />}
                />
                <Route
                    path="/register"
                    element={currentUser ? <Home /> : <Register />}
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
