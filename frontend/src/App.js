import React from "react";
import { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Users from "./components/user/Users";
import Stories from "./components/story/Stories";
import Nav from "./components/Nav";
import "./index.css";
import AddStory from "./components/story/AddStory";
import EditStory from "./components/story/EditStory";
import MyStories from "./components/story/MyStories";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./contexts/userContext";
import UsersStories from "./components/user/UsersStories";
import SingleStory from "./components/story/SingleStory";

//npx json-server --port=3001 --watch db.json
//final version as of 07.08.2022
export const App = () => {
  const [token, setToken] = useState(false);
  const [email, setEmail] = useState("");
  const [editStoryId, setEditStoryId] = useState("");

  const login = useCallback(
    (
      token,
      // _id,
      sähköpostiosoite
    ) => {
      setToken(token);
      setEmail(sähköpostiosoite);
      // setId(_id);
      // setLoggedIn(true);
    }
  );

  const logout = useCallback(() => {
    setToken(null);
  });

  // const setAppError = useCallback((err) => {
  //   if (err) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  //   setError(err);
  // });

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        email: email,

        // _id: _id,
        // setEmail: setMail,
      }}
    >
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/stories"
              element={
                <Stories
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              }
            />
            <Route
              path="/singlestory"
              element={
                <SingleStory
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              }
            />
            {/* <Route path="/storiestable" element={<StoriesTable />} /> */}
            <Route path="/addstory" element={<AddStory />} />
            <Route
              path="/editstory"
              element={
                <EditStory
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              }
            />
            <Route
              path="/mystories"
              element={
                <MyStories
                  editStoryId={editStoryId}
                  setEditStoryId={setEditStoryId}
                />
              }
            />
            <Route path="/usersstories" element={<UsersStories />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
