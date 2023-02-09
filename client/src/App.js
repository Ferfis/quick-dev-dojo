import * as React from "react";
import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import SinglePost from "./pages/SinglePost";
import { Provider } from "react-redux";
import { store } from "./store";
import Analytics from "./pages/Analytics";

export default function App() {

    return (
        <Provider store={store}>
            <Routes>
                <Route index path="login" element={<Login/>}/>
                <Route path="cadastro" element={<Register/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="analytics" element={<Analytics/>}/>
                <Route path="dashboard/post" element={<Post/>}/>
                <Route path="dashboard/post/:id" element={<Post/>}/>
                <Route path="dashboard/post/view/:id" element={<SinglePost/>}/>
                <Route path="dashboard/posts" element={<Posts/>}/>
                <Route path="dashboard/profile" element={<Profile/>}/>
                <Route path="dashboard/comments" element={<Comments/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </Provider>
    )
}
