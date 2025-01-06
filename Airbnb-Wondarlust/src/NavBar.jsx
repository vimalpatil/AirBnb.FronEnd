import "./css/search.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice";
export default function NavaBar({ setSearchTerm }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if (localStorage.getItem("isLogin")) {
  //   setIsLoggedIn(localStorage.getItem("isLogin"));
  // }
  const [SearchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (user) {
    console.log(user.loginfrom);
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(SearchValue);
    window.location.href = `/${SearchValue}`;
  };

  //console.log(Object.keys(user));
  // for (let r in user) {
  //   //for in loop iterates all properties in an object
  //   console.log(r); //print all properties in sequence
  //   console.log(user["loginfrom"]); //print all properties values
  // }
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    // return <Link to="/" />;
    window.location.href = "/";
  };

  return (
    <nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <i class="fa-solid fa-compass"></i>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="/">
              Explore
            </a>
          </div>
          <div class="navbar-nav ms-auto">
            <form
              class="d-flex"
              role="search"
              onSubmit={(e) => handleSearch(e)}
            >
              <input
                class="form-control me-2 search-inp"
                type="search"
                placeholder="Search destination"
                onChange={(e) => handleInputChange(e)}
              />
              <button class="btn search-btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>Search
              </button>
            </form>
          </div>
          {user ? (
            <div class="navbar-nav ms-auto">
              <a class="nav-link" href="/AddNewHome">
                Airbnb your home
              </a>{" "}
              <form
                onSubmit={(e) => handlelogout(e)}
                novalidate
                class="needs-validation"
              >
                <button className="btn nav-link">
                  {" "}
                  <b>Log out</b>
                </button>
              </form>
            </div>
          ) : (
            <div class="navbar-nav ms-auto">
              <a class="nav-link" href="/AddNewHome">
                Airbnb your home
              </a>{" "}
              <a class="nav-link" href="/usersignup">
                <b>Sign up</b>
              </a>
              <a class="nav-link" href="/login">
                <b>Log in</b>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
