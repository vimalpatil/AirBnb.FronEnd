import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useLocation, useParams } from "react-router-dom";

import "./css/filters.css";
export function Propertylisting({ searchTerm }) {
  const { search } = useParams();
  // const [error, setError] = useState("");
  let error;
  let API_URL;

  if (search) {
    API_URL = `https://localhost:7065/api/Property/location/${search}`;
  } else {
    API_URL = "https://localhost:7065/api/Property";
  }
  const [Plist, setPlist] = useState([]);
  // const [Plistbyloction, setPlistbylocation] = useState([]);
  const location = useLocation();

  const user = useSelector(selectUser);
  //console.log(user);

  let signuplogin = 0;

  let previousPath;
  let loginPath;

  previousPath = useRef(location?.state?.prevUrl);
  loginPath = useRef(location?.state?.prevUrl);
  console.log(location.pathname);
  // console.log(previousPath.current);
  if (user) {
    if (previousPath.current === "/usersignup") {
      // setSignuplogin(true);
      signuplogin = 1;
    } else {
      //setSignuplogin(false);
      signuplogin = 0;
    }
  }
  console.log(searchTerm);
  // if (searchTerm) {
  //   console.log(searchTerm);

  //   let getPropertyList = async () => {
  //     try {
  //       let response = await fetch(
  //         `https://localhost:7065/api/Property/location/${searchTerm}`
  //       );

  //       let jsonResponse = await response.json();
  //       //  console.log(jsonResponse);
  //       setPlistbylocation(jsonResponse);
  //       // console.log(setPlistbylocation);
  //     } catch (err) {
  //       console.log("Data fetching error:", err);
  //     }
  //   };
  //   getPropertyList();
  // } else {
  // console.log(API_URL);
  // setError("");
  useEffect(() => {
    let getPropertyList = async () => {
      try {
        let response = await fetch(API_URL);

        let jsonResponse = await response.json();
        console.log(jsonResponse.length);
        // if (jsonResponse.length === 0) {
        //   error = "No Homes are availabel in this Location!";
        //   // setError("No Homes are availabel in this Location!");
        // } else {
        setPlist(jsonResponse);
        console.log(Plist.length);

        // }
      } catch (err) {
        console.log("Data fetching error:", err);
      }
    };
    getPropertyList();
  }, []);
  // }
  if (Plist.length == 0) {
    error = "No Homes are availabel in this Location!";
  }
  console.log(error);
  // if (localStorage.getItem("isLogin")) {
  //   setIsLoggedIn(localStorage.getItem("isLogin"));
  // }

  const toggle_tax = () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    console.log(taxInfo);
    for (let info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  };

  return (
    <>
      {/* {signuplogin ? (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {"Welcome to wanderlust!"}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )} */}
      {/* {previousPath.current === "/AddNewHome" ? (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {"New Property Created!"}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )} */}
      {/* {previousPath.current === "/EditHome" ? (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {"Property updated succesfully!"}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )} */}
      {/* {loginPath ? (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {"Welcome back to wanderlust!"}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )} */}
      <div id="filters">
        <div class="filter">
          <div>
            <i class="fa-solid fa-fire"></i>
          </div>
          <p>Trending</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-bed"></i>
          </div>
          <p>Rooms</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-mountain-city"></i>
          </div>
          <p>Iconic Cities</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-mountain"></i>
          </div>
          <p>Mountains</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-brands fa-fort-awesome"></i>
          </div>
          <p>Castles</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-person-swimming"></i>
          </div>
          <p>Amazing pools</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-campground"></i>
          </div>
          <p>Camping</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-cow"></i>
          </div>
          <p>Farms</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-regular fa-snowflake"></i>
          </div>
          <p>Arctic</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-igloo"></i>
          </div>
          <p>Dome</p>
        </div>
        <div class="filter">
          <div>
            <i class="fa-solid fa-ship"></i>
          </div>
          <p>Boats</p>
        </div>
        <div class="tax-toogle" onClick={toggle_tax}>
          <div class="form-check-reverse form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Display total after taxes{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
        {error ? (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
        {/* {Plistbyloction.map((propListbyloction, i) => (
          <a
            href={`/HomeDetails/${propListbyloction.p_id}`}
            class="listing-link"
          >
            <div className="card col listing-card">
              <img
                src={`/images/${propListbyloction.image_name}`}
                className="card-img-top"
                alt="listing_image"
                style={{ height: "20rem" }}
              />

              <div className="card-body">
                <p className="card-text" key={i}>
                  <b>{propListbyloction.title}</b>
                  <br />
                  &#8377; {propListbyloction.price}
                  <i className="tax-info">&nbsp;&nbsp;+18% GST</i>
                </p>
              </div>
            </div>
          </a>
        ))} */}
        {Plist.map((propList, i) => (
          <a href={`/HomeDetails/${propList.p_id}`} class="listing-link">
            <div className="card col listing-card">
              <img
                src={`/images/${propList.image_name}`}
                className="card-img-top"
                alt="listing_image"
                style={{ height: "20rem" }}
              />

              <div className="card-body">
                <p className="card-text" key={i}>
                  <b>{propList.title}</b>
                  <br />
                  &#8377; {propList.price}
                  <i className="tax-info">&nbsp;&nbsp;+18% GST</i>
                </p>
              </div>
            </div>
          </a>
        ))}
        {/* <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div>

          <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div> */}
        {/* 
          <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div> */}
      </div>
    </>
  );
}
