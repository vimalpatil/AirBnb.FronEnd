import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

export function CreateNewHome() {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  let geometry;

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const userType = "o";
  const user = useSelector(selectUser);
  let ownerSignup;
  let previousPath;

  let signuplogin = 0;
  previousPath = useRef(location?.state?.prevUrl);
  if (user) {
    if (previousPath.current === "/AddNewHome") {
      // setSignuplogin(true);
      signuplogin = 1;
    } else {
      //setSignuplogin(false);
      signuplogin = 0;
    }

    //console.log(typeof usertype);
    if ((user.user_type = "o")) {
      ownerSignup = true;
      console.log(ownerSignup);
    } else {
      ownerSignup = false;
    }
    // if (user.user_type == "g") {
    //   ownerSignup = false;
    // } else {
    //   ownerSignup = false;
    // }
  }

  const titleRef = useRef();
  const desRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();
  const countryRef = useRef();
  const locationRef = useRef();
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      titleRef.current.value === "" ||
      desRef.current.value === "" ||
      priceRef.current.value === "" ||
      countryRef.current.value === "" ||
      locationRef.current.value === ""
    ) {
      return setError("All Fields are manadatory.");
    }
    setError("");
    getCoordinates();

    try {
      const postpropertyData = {
        title: titleRef.current.value,
        description: desRef.current.value,
        image_name: imageRef.current.value,
        price: priceRef.current.value,
        location: locationRef.current.value,
        geometry_coordinate: geometry,
        date: Date.now,
        country: countryRef.current.value,
        user_id: user.userid,
      };
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };
  //get map coordinates
  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
          },
        }
      );
      const { center } = response.data.features[0];
      // setCoordinates({ lat: center[1], lng: center[0] });
      geometry = `${center[1]}, ${center[0]}`;
      console.log(geometry);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (
      usernameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      return setError("All Fields are manadatory.");
    }
    setError("");
    try {
      const postUserdata = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        user_type: userType,
      };
      const res = await fetch("https://localhost:7065/api/User", {
        method: "post",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postUserdata),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        const data = await res.json();

        console.log(data);
        if (data == 0) {
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          return setError("Username or Email Already exist!");
        } else {
          dispatch(
            login({
              name: username,
              email: email,
              userid: data,
              loggedIn: true,
              user_type: userType,
              loginfrom: "signup",
            })
          );
          return navigate("/AddNewHome", {
            state: { prevUrl: location.pathname },
          });
        }

        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: {
        //     "Content-Type": res.headers.get("Content-Type"),
        //     "Content-Length": res.headers.get("Content-Length"),
        //   },
        //   data: data,
        // };
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };

  return (
    <>
      {signuplogin ? (
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
      )}
      {ownerSignup ? (
        <div class="row mt-3">
          <div class="col-8 offset-2">
            <br />
            <br />
            <h3>Create New Home</h3>
            <form
              class="needs-validation"
              novalidate
              enctype="multipart/form-data"
            >
              <div class="mb-3">
                <label for="title" class="form-label">
                  Title
                </label>
                <input
                  name="title"
                  id="title"
                  placeholder="Add a catchy title"
                  type="text"
                  class="form-control"
                  ref={titleRef}
                  required
                />
                <div class="valid-feedback">Title looks good!</div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  type="text"
                  ref={desRef}
                  class="form-control"
                  required
                ></textarea>
                <div class="invalid-feedback">
                  Please Enter Short Description.
                </div>
              </div>
              {/* <!-- <div class="mb-3">
                    <label for="image" class="form-label">Image Link</label>
                    <input name="listing[image]" placeholder="enter image URL/Links" type="text" class="form-control" />
                </div> --> */}
              <div class="mb-3">
                <label for="image" class="form-label">
                  Upload Listing Image
                </label>
                <input
                  name="image"
                  id="image"
                  ref={imageRef}
                  type="file"
                  class="form-control"
                  required
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="price" class="form-label">
                    Price
                  </label>
                  <input
                    name="price"
                    id="price"
                    placeholder="1200"
                    ref={priceRef}
                    class="form-control"
                    required
                  />
                  <div class="invalid-feedback">Price should be valid.</div>
                </div>
                <div class="mb-3 col-md-8">
                  <label for="country" class="form-label">
                    Country
                  </label>
                  <input
                    name="country"
                    id="country"
                    ref={countryRef}
                    placeholder="India"
                    type="text"
                    class="form-control"
                    required
                  />
                  <div class="invalid-feedback">
                    Country Name should be valid.
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">
                  Location
                </label>
                <input
                  name="location"
                  id="location"
                  ref={locationRef}
                  value={location}
                  onChange={handleInputChange}
                  placeholder="Jaipur,Rajastan"
                  type="text"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">Location should be valid.</div>
              </div>

              <button class="btn btn-dark add-btn mt-3">Add</button>
            </form>
          </div>
        </div>
      ) : (
        <div class="row mt-3">
          <h1 class="col-6 offset-3">SignUp As a Owner</h1>
          <div class="col-6 offset-3">
            {error && (
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
            )}
            <form
              className="needs-validation"
              onSubmit={(e) => handleUserSubmit(e)}
              novalidate
            >
              <div class="mb-3">
                <label for="username" class="form-label">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  ref={usernameRef}
                  className="form-control"
                />
                {/* <div class="valid-feedback">Looks good!</div> */}
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  ref={emailRef}
                  className="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  ref={passwordRef}
                  className="form-control"
                />
              </div>
              <button className="btn btn-success">SignUp</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
